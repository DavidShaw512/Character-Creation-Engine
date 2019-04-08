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

// The user provides an email and password to login
// exports.userLogin = (req, res) => {
//   const authToken = createAuthToken(req.user.serialize());
//   res.json({authToken});
// };

// The user exchanges a valid JWT for a new one with a later expiration
exports.refreshToken = (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
};

exports.testAuth = (req, res) => {
    res.send("Testing auth endpoint");
    res.status(200);
}

// All the "User.findOne..." stuff is already included in the localAuth strategy, no need to re-write it here.
// exports.userLogin = (req, res) => {
//     User.findOne({ email: req.body.email })
//         .then(user => {
//             if (!user) {
//                 res.status(401).json({
//                     message: "Invalid credentials"
//                 });
//                 console.log("Invalid credentials");
//                 alert("Invalid credentials");
//                 return
//             }
//             // return User.validatePassword(user.password);
//             bcrypt.compare(user.password, req.body.password, (err, result) => {
//                 if (err) {
//                     console.log("Invalid credentials: " + err);
//                     res.send("Invalid credentials");
//                 }
//                 if (result) {
//                     // pass 'remember me' to createAuthToken (req.body.rememberMe)
//                     const authToken = createAuthToken(req.user.serialize(), rememberMe);
//                     res.json(user, {authToken});
//                     authModule.storeToken(authToken);
//                     STORE.currentUser = user;
//                 }
//             });
//         })
// };

exports.refreshToken = (req, res) => {
    const authToken = createAuthToken(req.user);
    res.json({authToken});
}

// Registering a new user:
exports.newUserSignup = (req, res, next) => {
    console.log("New user signup");
    // First, check for correct fields:
    const requiredFields = ["email", "password"];
    const missingField = requiredFields.find(field => !(field in req.body));
    if (missingField) {
        const newError = new Error("Validation error");
        newError.status = 422;
        newError.message = "Signup requires email and password";
        next(newError);
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
            min: 6,
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

    // const user = new User({
    //     email,
    //     password: bcrypt.hash(password, 10)
    // });
    // console.log(user);

    // Then look to see if the email is already taken
    console.log("Check for user " + email);
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
        
    // BELOW: old stuff    ABOVE: new stuff
    // console.log("POST request to users");
    // res.status(200).json({
    //     message: "User posted!",
    // });
};