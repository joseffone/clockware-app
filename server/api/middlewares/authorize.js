'use strict'

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        req.userData = decoded;
        console.log(decoded);
        next();
    } catch (err) {
        res.status(401).json(
            {
                message: "Authorization failed"
            }
        );
    }
};