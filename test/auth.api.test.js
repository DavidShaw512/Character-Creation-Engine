"use strict"

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { app, runServer, closeServer } = require('../server');
const { User } = require('../models/userModel');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp)

describe("Auth endpoints", function() {
    const email = "sample@sample.com";
    const password = "samplepassword"

    before(function() {
        return runServer(TEST_DATABASE_URL);
    });

    after(function(done) {
        closeServer()
            .then(() => done())
            .catch(done);
    });

    afterEach(function(done) {
        User.deleteOne({email})
            .then(() => done())
            .catch(done);
    });

    

    describe("/auth/signup", function() {

        beforeEach(function() {

        });
    
        afterEach(function(done) {
            User.deleteOne({email})
                .then(() => done())
                .catch(done);
        });

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






        it("Should create a new user", function() {
            return chai.request(app)
                .post("/auth/signup")
                .send({
                    email,
                    password
                })
                .then(res => {
                    console.log("----- Auth signup create user test res.body: ", res.body);
                    expect(res).to.have.status(201);
                })
        })

    })

    //ABOVE: USER SIGNUP ENDPOINT TESTS
    //BELOW: USER LOGIN ENDPOINT TESTS

    describe("/auth/login", function() { // USER DELETION ISSUE HAPPENS IN HERE !!!!!!!!!!!!!!!!!!!!!!!

        beforeEach(function(done) {
            User.hashPassword(password).then(password => {
                return User.create({
                    email,
                    password
                })
            })
            .then(() => done())
            .catch(done);
        });

        afterEach(function(done) {
            User.deleteOne({email})
                .then(() => done())
                .catch(done);
        });

        it("Should reject login request with no credentials", function() {
            return chai.request(app)
                .post("/auth/login")
                .then((response) => {
                    expect(response).to.have.status(400);
                    // expect.fail(null, null, "Request should fail")
                });
                // .catch(err => {
                //     if (err instanceof chai.AssertionError) {
                //         throw err;
                //     }
                //     const res = err.response;
                //     expect(res).to.have.status(400);
                // });
        });

        it("Should reject login requests with incorrect passwords", function() {
            return chai.request(app)
                .post("/auth/login")
                .send({ email, password: "WrongPassword" })
                .then((response) => {
                    expect(response).to.have.status(401);
                    // expect.fail(null, null, 'Request should not succeed')
                });
                // .catch(err => {
                //     if (err instanceof chai.AssertionError) {
                //         throw err;
                //     }

                //     const res = err.response;
                //     expect(res).to.have.status(401);
                // });
        });

        it("Should reject login requests with incorrect emails", function() {
            return chai.request(app)
                .post("/auth/login")
                .send({ email: "WrongEmail", password })
                .then((response) => {
                    expect(response).to.have.status(401);
                    // expect.fail(null, null, 'Request should not succeed')
                });
        });

        it("Should return a valid auth token", function() {
            return chai.request(app)
                .post("/auth/login")
                .send({ email, password })
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    // console.log("-----Auth login test res.body: ", res.body)
                    const token = res.body.authToken;
                    expect(token).to.be.a('string');
                    const payload = jwt.verify(token, JWT_SECRET, {
                        algorithm: ["HS256"]
                    })
                    // console.log("------Auth login test token payload: ", payload);
                    expect(payload).to.have.keys("user", "iat", "exp", "sub");
                });
        });
        
    });


});