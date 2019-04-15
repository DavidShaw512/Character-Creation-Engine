"use strict"

const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');
const { User } = require('../models/userModel');
const { Character } = require('../models/characterModel');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp)

describe("/api/characters endpoint", function() {
    const email = "sample@sample.com";
    const password = "samplepassword"

    before(function() {
        return runServer(TEST_DATABASE_URL);
    });

    after(function() {
        return closeServer();
    });

    beforeEach(function() {
        return User.hashPassword(password).then(password => {
            User.create({
                email,
                password
            })
        });
    });

    afterEach(function() {
        User.remove({});
    });

    


})