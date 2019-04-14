"use strict"

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: String,
    characters: [characterSchema]
});

const characterSchema = mongoose.Schema({
    attributes: {
        name: String,
        race: String,
        charClass: String,
        accent: String,
        quirk: String,
        background: String,
    },
    stats: {
        STR: Number,
        CON: Number,
        DEX: Number,
        WIS: Number,
        CHA: Number,
        INT: Number
    }
});



const User = mongoose.model("User", userSchema)
const Character = mongoose.model("Character", characterSchema)



module.exports = { User, Character }