const express = require('express');
const app = express();

const userRouter = require("./routes/userRouter");
const characterRouter = require("./routes/characterRouter");

app.use(express.static('public'));

app.use("/api/users", userRouter);
app.use("/api/characters", characterRouter);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

module.exports = { app  }