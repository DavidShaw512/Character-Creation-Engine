"use strict"

const express = require("express");
const userRouter = express.Router();
// const userController = require("./../controllers/user.controller")
const {
    getAllUsers, // postUser was moved to the auth controller
    getUser,
    putUser,
    deleteUser,
    getCurrentUser
} = require("../controllers/userController")

// Doesn't need user Id:
userRouter.route("/users")
    .get(getAllUsers)
    

// userRouter.get("/", userController.getAllUsers);

userRouter.route("/users/me")
    .get(getCurrentUser)

// Needs user Id:
userRouter.route("/users/:id")
    .get(getUser)
    .put(putUser)
    .delete(deleteUser)
// userRouter.get("/:id", userController.getUser);






module.exports = userRouter

