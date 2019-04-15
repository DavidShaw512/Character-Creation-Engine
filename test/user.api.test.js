"use strict"

const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');
const { User } = require('../models/userModel');
const { Character } = require('../models/characterModel');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp)

describe("User signup endpoint", function() {
    before(function() {
        return runServer(TEST_DATABASE_URL);
    });

    after(function() {
        return closeServer();
    });

    beforeEach(function() {

    });

    afterEach(function() {
        return User.remove({})
    });

    
})