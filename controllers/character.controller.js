const Characters = require("./../models/character");

exports.getAllCharacters = (req, res) => {
    res.send("All characters got!");
};

exports.postCharacter = (req, res) => {
    res.send("Character posted!");
};



exports.getCharacter = (req, res) => {
    res.send("Character got!");
};

exports.putCharacter = (req, res) => {
    res.send("Character updated!");
};

exports.deleteCharacter = (req, res) => {
    res.send("Character deleted!");
};