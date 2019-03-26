const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
const passport = require('passport');

// const userRouter = require("./routes/userRouter");
// const characterRouter = require("./routes/characterRouter");
const testRouter = require("./routes/testRouter");
const { DATABASE_URL } = require('./config');
const { jwtStrategy, localStrategy } = require('./util/authStrategies');

const app = express();

// passport.use(localStrategy);

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });

app.use(morgan("dev"));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

passport.use(jwtStrategy);
passport.use(localStrategy);

// app.use("/api/users", userRouter);
// app.use("/api/characters", characterRouter);
const jwtAuth = passport.authenticate('jwt', { session: false });

app.use("/messages", testRouter);
app.use("/auth", [
    require("./routes/authRouter")
]);
app.use("/api", [
    jwtAuth,
    require("./routes/characterRouter"),
    require("./routes/userRouter"),
]);

app.use((req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

module.exports = { app }