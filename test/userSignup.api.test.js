"use strict"

const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');
const { User } = require('../models/userModel');
const { TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp)

describe("User signup endpoint", function() {
    const email = "email@email.com";
    const password = "password";
    const email2 = "email2@email2.com";
    const password2 = "password2";

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

    describe("/auth/signup", function() {
        it("Should reject a signup request with no credentials", function() {
            return chai.request(app)
                .post("/auth/signup")
                .then(res => {
                    console.log("-----Auth signup test response body: ", res.body);
                    expect(res).to.have.status(422);
                    // expect(res.body.reason).to.equal("Validation error");
                    // expect(res.body.message).to.equal("Signup requires email and password")
                })
                // .catch(err => {
                //     console.log("Signup test error: ", err)
                // })
        });



    })
    
})