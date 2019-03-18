const express = require('express');
const app = express();
const morgan = require('morgan');

const userRouter = require("./routes/userRouter");
const characterRouter = require("./routes/characterRouter");
const testRouter = require("./routes/testRouter");

app.use(morgan("Short"));
app.use(express.static('public'));

app.use("/api/users", userRouter);
app.use("/api/characters", characterRouter);
app.use("/messages", testRouter);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

module.exports = { app }