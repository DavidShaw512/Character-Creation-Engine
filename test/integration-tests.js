"use strict"

const chai = require('chai');
const chaiHttp = require('chai-http');

const { app } = require("../server")

chai.use(chaiHttp)

