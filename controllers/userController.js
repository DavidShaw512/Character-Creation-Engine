const { User } = require("../models/userModel");
const bcrypt = require('bcrypt');

exports.getAllUsers = (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(404).send(err)
        });
    // console.log("GET request for all users");
    // res.status(200).json({
    //     message: "All users got!"
    // });
};

exports.getUser = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            res.status(200).json(user);
            console.log("User got!");
        })
        .catch(err => {
            res.status(404).send(err);
            console.log("No such user");
        });
    console.log("GET request for one user");
};

exports.putUser = (req, res) => {
    console.log("PUT request for one user");
    res.status(200).json({
        message: "User posted!"
    });
};

exports.deleteUser = (req, res) => {
    console.log(req.params.id);
    User.findOneAndRemove({ _id: req.params.id })
        .then(() => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(422).json({
                code: 422,
                error: err,
                message: "Something bad happened"
            });
        });
    // console.log("DELETE request for one user");
    // res.status(200).json({
    //     message: "User deleted!"
    // });
};