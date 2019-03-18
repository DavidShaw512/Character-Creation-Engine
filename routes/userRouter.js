"use strict"

const express = require("express");
const userRouter = express.Router();
const userController = require("./../controllers/user.controller")

// Doesn't need user Id:
userRouter.get("/", userController.getAllUsers);
userRouter.post("/", userController.postUser);

// Needs user Id:
userRouter.get("/:id", userController.getUser);
userRouter.put("/:id", userController.putUser);
userRouter.delete("/:id", userController.deleteUser);




module.exports = userRouter

