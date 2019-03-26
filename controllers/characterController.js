const Characters = require("../models/characterModel");
const { User } = require("../models/userModel");

exports.getAllCharacters = (req, res) => {
    // Get user from request & look up in DB (access user in database)
    // Return all characters on that user
    User.findOne(req.user.email)
        .then(user => {
            res.send("All characters got!").json(user.characters);
        });
};

exports.postCharacter = (req, res) => {
    // push character into list of users' characters, save the user
    res.send("Character posted!");
};



exports.getCharacter = (req, res) => {
    // Get user from request & look up in DB
    // Check if user owns character in the params (param will have an id)
    // If they do, send the character back (could make a middleware called "ownsCharacter", could use it on get, put, delete)
    res.send("Character got!");
};

exports.putCharacter = (req, res) => {
    res.send("Character updated!");
};

exports.deleteCharacter = (req, res) => {
    res.send("Character deleted!");
};