"use strict"

const mongoose = require("mongoose");
const User = require("./userModel");

mongoose.Promise = global.Promise;

const CharacterSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    attributes: {
        race: {type: String, default: ""},
        class: {type: String, default: ""},
        accent: {type: String, default: ""},
        quirk: {type: String, default: ""}
    },
    stats: {
        STR: {type: String, default: ""},
        CON: {type: String, default: ""},
        DEX: {type: String, default: ""},
        WIS: {type: String, default: ""},
        CHA: {type: String, default: ""},
        INT: {type: String, default: ""}
    },
    background: {
        type: String,
        default: ""
    }
})

CharacterSchema.methods.serialize = function() {
    return {
        user: this.user || "",
        id: this._id || "",
        name: this.name || "",
        attributes: this.attributes || {
            race: "",
            class: "",
            accent: "",
            quirk: ""
        },
        stats: this.stats || {
            STR: "",
            CON: "",
            DEX: "",
            WIS: "",
            CHA: "",
            INT: ""
        },
        background: this.background || ""
    };
};

CharacterSchema.post('save', (doc, next) => {
    User.find(doc.user)
        .then(user => {
            user.characters.push(doc);
            user.save();
        })
        .then(() => {
            next();
        });
})

const Character = mongoose.model("Character", CharacterSchema);

module.exports = { Character };

// module.exports = mongoose.model("Character", CharacterSchema);