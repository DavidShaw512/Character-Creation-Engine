const { User } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');

const createAuthToken = function(user, rememberMe) {
    return jwt.sign({user}, config.JWT_SECRET, {
      subject: user.email,
      expiresIn: rememberMe 
        ? '30d' 
        : config.JWT_EXPIRY, // use ternary operator for 'remember me'
      algorithm: 'HS256'
    });
};

// The user exchanges a valid JWT for a new one with a later expiration
exports.refreshToken = (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
};

exports.testAuth = (req, res) => {
    res.send("Testing auth endpoint");
    res.status(200);
}

exports.refreshToken = (req, res) => {
    const authToken = createAuthToken(req.user);
    res.json({authToken});
}

// Registering a new user:
exports.newUserSignup = (req, res, next) => {
    // First, check for correct fields:
    const requiredFields = ["email", "password"];
    const missingField = requiredFields.find(field => !(field in req.body));
    if (missingField) {
        const newError = new Error("Validation error");
        newError.status = 422;
        newError.message = "Signup requires email and password";
        return next(newError);
    };

    // Create helper function that can validate on any endpoint (be lazy, DRY)

    // Then check that fields don't start or end with whitespace:
    const explicitlyTrimmedFields = ["email", "password"];
    const nonTrimmedField = explicitlyTrimmedFields.find(field => {
        req.body[field].trim() !== req.body[field]
    });
    if (nonTrimmedField) {
        return res.status(422).json({
            code: 422,
            reason: "Validation error",
            message: "Cannot start or end fields with whitespace",
            location: nonTrimmedField
        });
    }

    // Then check that the fields aren't too small or too big
    const sizedFields = {
        email: {
            min: 6
        },
        password: {
            min: 4,
            max: 72
        }
    };
    const tooSmallField = Object.keys(sizedFields).find(field =>
        'min' in sizedFields[field] && req.body[field].trim().length < sizedFields[field].min 
    );
    const tooLargeField = Object.keys(sizedFields).find(field => 
        'max' in sizedFields[field] && req.body[field].trim().length > sizedFields[field].max
    );
    if (tooSmallField || tooLargeField) {
        return res.status(422).json({
            code: 422,
            reason: "Validation error",
            message: tooSmallField
                ? `must be at least ${sizedFields[tooSmallField].min} characters long`
                : `must be at most ${sizedFields[tooLargeField].max} characters long`,
            location: tooSmallField || tooLargeField
        });
    };

    let {email, password} = req.body

    // Then look to see if the email is already taken
    User.findOne({email})
        .then(user => {
            if (user) {
                return Promise.reject({
                    code: 422,
                    reason: "Validation error",
                    message: "Email already exists",
                    location: "email"
                })
            }
            return User.hashPassword(password);
        })
        .then(password => {
            return User.create({
                email,
                password
            });
        })
        .then(user => {
            return res.status(201).json(user.serialize());
        })
        .catch(error => {
            console.log(error);
            if (error.reason === "Validation error") {
                return res.status(error.code).json(error);
            };
            res.status(500).json({code: 500, message: "Internal server error"});
        });
};