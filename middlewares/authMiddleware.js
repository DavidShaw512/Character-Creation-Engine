"use strict"

const isAuthorized = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(404);
    };
};

module.exports = { isAuthorized };