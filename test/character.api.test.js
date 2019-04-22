"use strict"

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { app, runServer, closeServer } = require('../server');
const { User } = require('../models/userModel');
const { Character } = require('../models/characterModel');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp)

describe("Protected character endpoints", function() { // user deletion issue does not happen here
    const email = "email@characters.com";
    const password = "password";


    before(function() {
        return runServer(TEST_DATABASE_URL);
    });

    after(function() {
        mongoose.connection.db.dropDatabase();
        return closeServer();
    });

    beforeEach(function() {
        return User.hashPassword(password).then(password => {
            User.create({
                email,
                password,
                characters: []
            });
        });
    });

    afterEach(function() {
        User.deleteOne({email})
    })

    

    describe("/api/characters", function() {


        it("Should reject characters request with no credentials", function() {
            return chai.request(app)
                .get("/api/characters")
                .then(res => {
                    expect(res).to.have.status(401);
                    console.log("##### Api/characters response body:", res.body);
                })
        });

        it("Should GET all characters", function() {
            const token = jwt.sign(
                {
                    user: {
                        email,
                        password
                    }
                },
                JWT_SECRET,
                {
                    algorithm: "HS256",
                    subject: email,
                    expiresIn: "7d"
                }
            );

            return chai.request(app)
                .get("/api/characters/")
                .set("authorization", `Bearer ${token}`)
                .then(res => {
                    expect(res).to.have.status(200);
                    console.log("**** Api/characters get test response body: ", res.body)
                    expect(res.body.characters).to.be.a("Array")
                    // expect(res.body).to.have.lengthOf(1);
                })
            // return chai.request(app)
            //     .post("/auth/login")
            //     .send({ email, password })
            //     .then(() => {
            //         return chai.request(app)
            //     })
        });

        it("Should create a new character", function() {
            const token = jwt.sign(
                {
                    user: {
                        email,
                        password
                    }
                },
                JWT_SECRET,
                {
                    algorithm: "HS256",
                    subject: email,
                    expiresIn: "7d"
                }
            );

            // const sampleCharacter = {
            //     name: "Sample Character",
            //     attributes: {},
            //     stats: {},
            //     background: "No background"
            // }

            let user;

            return User.findOne({ email: "email@characters.com" })
                .then(_user => {
                    user = _user;
                    console.log("||||| Found this user: ", user.id)
                    return chai.request(app)
                    .post("/api/characters/")
                    .set("authorization", `Bearer ${token}`)
                    .send({
                        name: "Sample Character",
                        attributes: {},
                        stats: {},
                        background: "A very interesting background",
                        user: user.id
                    })
                    .then(res => {
                        expect(res).to.have.status(201);
                        console.log("**** Api/characters POST test response body: ", res.body)
                        // expect(res.body).to.be.a("Array")
                        // expect(res.body).to.have.lengthOf(1);
                    })
                }) 
        });

        // it("Should PUT(update) a character", function() {

        // })

        it("Should DELETE a character", function() {
            const token = jwt.sign(
                {
                    user: {
                        email,
                        password
                    }
                },
                JWT_SECRET,
                {
                    algorithm: "HS256",
                    subject: email,
                    expiresIn: "7d"
                }
            );

          
            return Character.findOne({ name: "Sample Character" })
                .then(char => {
                    console.log("::::::::    This character should have been found   :::::::", char)
                    return chai.request(app)
                        .delete(`/api/characters/${char.id}`)
                        .set("authorization", `Bearer ${token}`)
                        .then(res => {
                            expect(res).to.have.status(204);
                            console.log("**** Api/characters DELETE test response body: ", res.body)
                        //     return Character.findById(char.id)
                        // })
                        // .then(_char => {
                        //     should.not.exist(_char);
                        })
                })

        

            

        })

    });
})