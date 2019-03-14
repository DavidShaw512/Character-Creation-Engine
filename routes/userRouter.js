"use strict"

const express = require("express");
const userRouter = express.Router();

const { getUser } = require("./../controllers/user.controller");

router.use("/user");
router.get(getUser);
router.post(getUser);

userRouter.use("/user/:id");
userRouter.get(getUser);
userRouter.put(getUser);
userRouter.delete(getUser);




module.exports = { userRouter }

