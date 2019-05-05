'use strict';
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config');
const authRouter = express.Router();

const {
    testAuth,
    userLogin,
    newUserSignup,
    refreshToken
} = require("../controllers/authController");

authRouter.route("/")
    .get(testAuth);

// authRouter.route("/login")
//     .post(userLogin);

authRouter.route("/signup")
    .post(newUserSignup);

authRouter.route("/refresh")
    .post(refreshToken);



const createAuthToken = function(user, rememberMe) {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.email,
    expiresIn: rememberMe 
        ? '30d' 
        : config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', {session: false});

// The user provides a email and password to login
authRouter.post('/login', localAuth, (req, res) => {
  const user = req.user;
  const authToken = createAuthToken(req.user.serialize(), req.body.rememberMe);
  res.json({user, authToken});
});

const jwtAuth = passport.authenticate('jwt', {session: false});

// The user exchanges a valid JWT for a new one with a later expiration
authRouter.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  const user = req.user;
  res.json({
    user,  
    authToken
});
});

module.exports = authRouter;