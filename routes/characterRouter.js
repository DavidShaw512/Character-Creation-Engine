"use strict"

const express = require("express");
const characterRouter = express.Router();

const {
    getAllCharacters,
    postCharacter,
    getCharacter,
    putCharacter,
    deleteCharacter
} = require("../controllers/characterController");

// Doesn't need character Id:
characterRouter.route("/characters")
    .get(getAllCharacters)
    .post(postCharacter)

// Needs character Id:
characterRouter.route("/characters/:id")
    .get(getCharacter)
    .put(putCharacter)
    .delete(deleteCharacter)

module.exports = characterRouter