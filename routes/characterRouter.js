"use strict"

const express = require("express");
const characterRouter = express.Router();

const { getCharacter } = require("./../controllers/character.controller");

characterRouter.use("/characters");
characterRouter.get(getCharacter);
characterRouter.post(getCharacter);

characterRouter.use("/character/:id");
characterRouter.get(getCharacter);
characterRouter.post(getCharacter);
characterRouter.delete(getCharacter);