"use strict"

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const CharacterSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
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

const Character = mongoose.model("Character", CharacterSchema);

module.exports = { Character };