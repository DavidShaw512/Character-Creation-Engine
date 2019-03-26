"use strict"
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    characters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character'
        // 
    }]
});

UserSchema.methods.serialize = function() {
    return {
        email: this.email || "",
        password: this.password || ""
    };
};

// Here goes some hash/auth functions for the password

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};

const User = mongoose.model("User", UserSchema);

module.exports = { User }

// module.exports = mongoose.model("User", UserSchema);