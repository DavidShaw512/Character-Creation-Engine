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

describe("Protected character endpoints", function() {
    const email = "email@characters.com";
    const password = "password";

    const defaultCharacter = {
        name: "Default Character",
        attributes: {},
        stats: {},
        background: "Default background"
    }

    before(function() {
        return runServer(TEST_DATABASE_URL)
            // .then(() => {
                
            // });
    });

    after(function() {
        mongoose.connection.db.dropDatabase();
        return closeServer()
            // .then(() => {
            //     return User.deleteMany({email})
            // });
    });

    beforeEach(function() {
    });

    afterEach(function() {
    });

    

    describe("/api/characters", function() {
        before(function() {
            return User.hashPassword(password).then(password => {
                return User.create({
                    email,
                    password,
                    characters: [],
                });
            })
        });

        after(function() {
            return User.findOneAndDelete({email});
        })

        beforeEach(function() {
            return User.findOne({email})
                .then(user => {
                    return Character.create({ ...defaultCharacter, user: user.id })
                })         
        })

        afterEach(function() {
            // return Character.findOne({name: defaultCharacter.name})
            //     .then(char => {
            //         console.log("AFTEREACH Character found for deletion, should have been made in beforeEach ::::", char)
                    return Character.deleteOne({name: defaultCharacter.name})
                // })
        });

        function getToken() {
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
            return token;
        }
        

        it("Should reject characters request with no credentials", function() {
            return chai.request(app)
                .get("/api/characters")
                .then(res => {
                    expect(res).to.have.status(401);
                })
        });

        it("Should GET all characters", function() {
            const token = getToken();

            const getTestCharacter = {
                name: "GET test character",
                attributes: {},
                stats: {},
                background: "None, gonna be deleted"
            };

            Character.create({getTestCharacter});

            return chai.request(app)
                .get("/api/characters/")
                .set("authorization", `Bearer ${token}`)
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res.body.characters).to.be.a("Array");
                    // expect(res.body.characters).to.have.lengthOf(1);
                })
                .then(() => {
                    return Character.deleteOne({name: getTestCharacter.name})
                })
        });

        it("Should create a new character", function() {
            const token = getToken();

            let user;
            let characterName = "Sample Character";

            return User.findOne({ email: "email@characters.com" })
                .then(_user => {
                    user = _user;
                    return chai.request(app)
                    .post("/api/characters/")
                    .set("authorization", `Bearer ${token}`)
                    .send({
                        name: characterName,
                        attributes: {},
                        stats: {},
                        background: "A very interesting background",
                        user: user.id
                    })
                    .then(res => {
                        expect(res).to.have.status(201);
                        return Character.findOneAndDelete({ name: characterName });
                    })
                }) 
        });

        // it("Should PUT(update) a character", function() {
        //     const token = getToken();
        //     const updates = {
        //         background: "A less interesting background"
        //     };

        //     return Character.findOne({ name: defaultCharacter.name })
        //         .then(char => {
        //             return chai.request(app)
        //                 .put(`api/characters/${char.id}`)
        //                 .set("authorization", `Bearer ${token}`)
        //                 .send(updates)
        //                 .then(res => {
        //                     console.log(".....PUT test response body    ::::::::", res.body)
        //                     expect(res).to.have.status(200);
        //                 })
                        
        //         })
        // })

        // it("Should DELETE a character", function() {
        //     const token = getToken();

        //     // const deleteTestCharacter = {
        //     //     name: "Delete tester",
        //     //     attributes: {},
        //     //     stats: {},
        //     //     background: "Gonna get deleted"
        //     // };

        //     // Character.create({deleteTestCharacter});

        //     let char;
          
        //     return Character.findOne({ name: defaultCharacter.name })
        //         .then(_char => {
        //             char = _char;
        //             console.log("DELETE test character found    :::::::", char.id);
        //             return chai.request(app)
        //                 .delete(`/api/characters/${char.id}`)
        //                 .set("authorization", `Bearer ${token}`)
        //                 .then(res => {
        //                     expect(res).to.have.status(204);
        //                     return Character.findById(char.id)
        //                 })
        //                 .then(char => {
        //                     should.not.exist(char);
        //                 })
        //                 .then(() => {
        //                     return Character.deleteOne({name: defaultCharacter.name})
        //                 })
        //         })

        

            

        // })

    });
})