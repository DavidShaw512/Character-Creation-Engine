"use strict"

const express = require("express");
const characterRouter = express.Router();

const characterController = require("./../controllers/character.controller");

// Doesn't need character Id:
characterRouter.get("/", characterController.getAllCharacters);
characterRouter.post("/", characterController.postCharacter);

// Needs character Id:
characterRouter.get("/:id", characterController.getCharacter);
characterRouter.put("/:id", characterController.putCharacter);
characterRouter.delete("/:id", characterController.deleteCharacter);

module.exports = characterRouter