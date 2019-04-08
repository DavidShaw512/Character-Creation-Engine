const { Character } = require("../models/characterModel");
const { User } = require("../models/userModel");

exports.getAllCharacters = (req, res) => {
    // Get user from request & look up in DB (access user in database)
    // Return all characters on that user
    User.findOne(req.user.id)
        .then(user => {
            res.send("All characters got!").json(user.characters);
        })
        .catch(err => {
            console.log(err);
            res.json({err});
        });
};

exports.postCharacter = (req, res) => {
    // push character into list of users' characters, save the user
    User.findOne(req.user.id)
        .then(user => {
            return Character.create({
                name: `${req.body.name}`,
                attributes: req.body.attributes,
                stats: req.body.stats,
                background: req.body.background,
                user: user._id
            })
            .then(character => {
                res.status(201).json({
                    name: character.name,
                    attributes: {
                        race: `${character.attributes.race}`,
                        class: `${character.attributes.class}`
                    },
                    id: character._id
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: error.message
                });
            });
        });
};



exports.getCharacter = (req, res) => {
    // Get user from request & look up in DB
    // Check if user owns character in the params (param will have an id)
    // If they do, send the character back (could make a middleware called "ownsCharacter", could use it on get, put, delete)
    User.findOne(req.user.id)
        .then(user => {
            return user.characters.filter(character => character._id === req.params.id)
        })
        .then(character => {
            character
                ? res.status(200).json({character})
                : res.status(404).send("No such character");
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("Something went wrong").json({error})
        })
};

exports.putCharacter = (req, res) => {
    // Write an 'ownsCharacter' middleware to use here
    User.findOne(req.user.id)
        .then(user => {
            return user.characters.filter(character => character._id === req.params.id);
        })
        .then(character => {
            
        })
        res.send("Character updated!");
};

exports.deleteCharacter = (req, res) => {
    // Write an 'ownsCharacter' middleware to use here
    User.findOne(req.user.id)
        .then(user => {
            return user.characters.filter(character => character._id === req.params.id);
        })
        .then(character => {
            if (!character) {
                res.status(404).send("Character not found");
            } else {
                Character.findByIdAndDelete(req.params.id);
                res.status(200).send("Character deleted");
            }  
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Something went wrong").json(err);
        })
};