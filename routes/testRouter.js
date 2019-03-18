const express = require('express');
const testRouter = express('router');

const testController = require("./../controllers/test.controller");

testRouter.get('/', testController.test_message);

module.exports = testRouter;