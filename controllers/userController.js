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
};

exports.getUser = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(404).send(err);
        });
};

exports.putUser = (req, res) => {
    res.status(200).json({
        message: "User posted!"
    });
};

exports.deleteUser = (req, res) => {
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
};

exports.getCurrentUser = (req, res) => {
    User.findOne({ email: req.user.email }).populate('characters')
      .then(user => {
        if (user) {
            res.status(200).json(user.serialize());
        } else {
            res.status(404);
            
        }
        
      })
      .catch(error => {
        console.log(error);
            res.status(422).json({
                code: 422,
                error,
                message: "Something bad happened"
            });
      });
}