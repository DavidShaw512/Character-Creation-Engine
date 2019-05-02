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

describe("User endpoint", function() {
    const email = "email@email.com";
    const password = "password";
    const email2 = "email2@email2.com";
    const password2 = "password2";

    before(function() {
        return runServer(TEST_DATABASE_URL);
    });

    after(function(done) {
        closeServer()
            .then(() => done())
            .catch(done);
    });

    beforeEach(function() {
    });

    afterEach(function(done) {
        User.deleteOne({email})
            .then(() => done())
            .catch(done);
    });

    describe("/api/users", function() { // user deletion issue does not happen here
        it("Should reject users request with no credentials", function() {
            return chai.request(app)
                .get("/api/users")
                .then(res => {
                    expect(res).to.have.status(401);
                })
        });

        // it("Should return protected user data", function() {
        //     return User.hashPassword(password).then(password => {
        //         User.create({
        //             email,
        //             password,
        //             characters: []
        //         });

        //         const token = jwt.sign(
        //             {
        //                 user: {
        //                     email,
        //                     password
        //                 }
        //             },
        //             JWT_SECRET,
        //             {
        //                 algorithm: "HS256",
        //                 subject: email,
        //                 expiresIn: "7d"
        //             }
        //         );
    
        //         return chai.request(app)
        //             .get("/api/users/")
        //             .set("authorization", `Bearer ${token}`)
        //             .then(res => {
        //                 expect(res).to.have.status(200);
        //                 console.log("**** Api/users test response body: ", res.body)
        //                 expect(res.body).to.be.a("Array")
        //                 expect(res.body).to.have.lengthOf(1);
        //             })
        //     });

        //     // console.log("Finding the user that was just created: ", User.findOne({email}))

            
        // })

    });
    
})