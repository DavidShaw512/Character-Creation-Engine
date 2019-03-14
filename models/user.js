"use strict"

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
});

UserSchema.methods.serialize = function() {
    return {
        email: this.email || "",
        password: this.password || ""
    };
}

// Here goes some hash/auth functions for the password

const User = mongoose.model("User", UserSchema);

module.exports = { User }