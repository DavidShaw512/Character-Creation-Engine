const Users = require("./../models/user");

exports.getAllUsers = (req, res) => {
    // return Users.find()
    //     .then(users => {
    //         res.status(200).json(users);
    //     })
    //     .catch(err => {
    //         res.status(404).send(err)
    //     })
    res.send("All users got!");
};

exports.postUser = (req, res) => {
    res.send("User posted!");
};

exports.getUser = (req, res) => {
    res.send("User got!");
};

exports.putUser = (req, res) => {
    res.send("User updated!");
};

exports.deleteUser = (req, res) => {
    res.send("User deleted!");
};