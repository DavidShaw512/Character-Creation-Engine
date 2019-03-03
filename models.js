"use strict"

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: "",
    characters: [characterSchema]
});

const characterSchema = mongoose.Schema({
    attributes: {
        name: "",
        race: "",
        class: "",
        accent: "",
        quirk: "",
        background: "",
    },
    stats: {
        str: 0,
        con: 0,
        dex: 0,
        wis: 0,
        int: 0,
        cha: 0,
    }
});



const User = mongoose.model("User", userSchema)
const Character = mongoose.model("Character", characterSchema)



module.exports = { User, Character }