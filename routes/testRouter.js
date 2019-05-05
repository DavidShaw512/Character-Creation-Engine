const express = require('express');
const testRouter = express('router');

const testController = require("../controllers/testController");

testRouter.get('/', testController.test_message);

module.exports = testRouter;