const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
const passport = require('passport');

// const userRouter = require("./routes/userRouter");
// const characterRouter = require("./routes/characterRouter");
const testRouter = require("./routes/testRouter");
const { PORT, DATABASE_URL } = require('./config');
const { jwtStrategy, localStrategy } = require('./util/authStrategies');

const app = express();

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

let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    // mongoose.connection.db.dropDatabase(); THIS IS DELETING THE PRODUCTION DATABASE
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, 
// test code) can start the server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error);
});

module.exports = { app, runServer, closeServer }