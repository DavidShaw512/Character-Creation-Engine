const { Character } = require("../models/characterModel");
const { User } = require("../models/userModel");

exports.getAllCharacters = (req, res) => {
    // Access characters in database (use Character model)
    // Find and return all characters with the request's user id
    Character.find({ user: req.user.id })
        .then(characters => {
            res.status(200).json({characters});
        })
        .catch(err => {
            console.log(err);
            res.json({err});
        });
};

exports.postCharacter = (req, res) => {
    console.log("Request user: ", req.user);
    console.log("Request body: ", req.body)
    // push character into list of users' characters, save the user
    return Character.create({
            name: req.body.name || "",
            attributes: req.body.attributes || {},
            stats: req.body.stats || {},
            background: req.body.background || "",
            user: req.user.id
        })
        .then(character => {
            console.log("New character: ", character, " New character end");
            res.status(201).json(character.serialize());
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error.message
            });
        });
};



exports.getCharacter = (req, res) => {
    // Get user from request & look up in DB
    // Check if user owns character in the params (param will have an id)
    // If they do, send the character back (could make a middleware called "ownsCharacter", could use it on get, put, delete)
    Character.findOne({_id: req.params.id})
        .then(character => {
            if (!character) {
                res.status(404).send("No such user, you dummy")
            };
            if (character.user._id.toString() !== req.user.id) {
                res.status(401).send("ACCESS DENIED, DUMMY: req.user = " + req.user + " character = " + character);
            }
            res.status(200).json(character.serialize());
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("There was an error, dummy: " + error).json(error);
        })
    
    // User.findOne(req.user.id)
    //     .then(user => {
    //         return user.characters.filter(character => character.id === req.params.id)
    //     })
    //     .then(([character]) => {
    //         character
    //             ? res.status(200).json({character})
    //             : res.status(404).send("No such character");
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         res.status(500).send("Something went wrong").json(error)
    //     })
};

exports.putCharacter = (req, res) => {
    // Write an 'ownsCharacter' middleware to use here
    Character.findById(req.params.id)
        .then(character => {
            console.log(character);
            console.log(req.params.id);
            if (!character) {
                throw new Error();
            }
            if (character.user._id.toString() !== req.user.id) {
                res.status(401).send("Not authorized");
            }
            return Character.findOneAndUpdate({ _id: character.id }, { $set: { 
                name: req.body.name,
                attributes: req.body.attributes,
                stats: req.body.stats,
                background: req.body.background 
            }}, { new: true } )


        })
        .then(character => {
            console.log(req.body);
            res.status(200).send(character.serialize())
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("Whoopsie: " + error).json({error});
        })
};

exports.deleteCharacter = (req, res) => {
    // Write an 'ownsCharacter' middleware to use here
    Character.findOne({_id: req.params.id})
        .then(character => {
            if (!character) {
                res.status(404).send("No such user, you dummy")
            };
            if (character.user._id.toString() !== req.user.id) {
                res.status(401).send("ACCESS DENIED, DUMMY")
            }
            return Character.findByIdAndDelete(req.params.id);
        })
        .then(() => {
            res.status(204)
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("Something went wrong, dummy: " + error).json(error);
        })
};