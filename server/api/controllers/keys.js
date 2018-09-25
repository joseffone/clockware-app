'use strict'

const jwt = require('jsonwebtoken');
const controller = {};

controller.updateItem =  (req, res) => {

    controller.db.keys.findAll({where: {user_id: req.params.userId}})
    .then(async key => {
        if (key.length !== 0) {
            if (key[0].refresh_token === req.body.refresh_token) {
                const decoded = jwt.verify(req.body.refresh_token, process.env.JWT_REFRESH_KEY);
                req.userData = decoded;
                await controller.db.users.findAll({where: {id: req.params.userId}})
                .then(user => {
                    const accessToken = jwt.sign(
                        {
                            id: user[0].id,
                            email: user[0].email
                        },
                        process.env.JWT_ACCESS_KEY,
                        {
                            expiresIn: 10*60
                        }
                    );
                    const refreshToken = jwt.sign(
                        {
                            id: user[0].id,
                            email: user[0].email
                        },
                        process.env.JWT_REFRESH_KEY,
                        {
                            expiresIn: '24h'
                        }
                    );
                    key[0].setDataValue('refresh_token', refreshToken);
                    return {
                        newKey: key[0].save(),
                        access_token: accessToken,
                        refresh_token: refreshToken
                    }
                    
                })
                .then(keyObj => {
                    return res.status(200).json(
                        {
                            message: "Refreshing successful",
                            access_token: keyObj.access_token,
                            refresh_token: keyObj.refresh_token
                        }
                    );
                })
                return;
            }
        }

        res.status(401).json(
            {
                message: "Refreshing failed"
            }
        );
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(
            {error: err}
        );
    });

};

controller.deleteItem = (req, res) => {

    controller.db.keys.destroy({where: {user_id: req.params.userId}})
    .then(deletedKey => {
        if (deletedKey === 1) {
            res.status(200).json(
                {
                    message: "Logout successfully"
                }
            );
        } else {
            res.status(404).json(
                {
                    error: {message: "No valid entry found for provided ID"}
                }
            );
        }
    })
    .catch(err => {
        res.status(500).json(
            {error: err}
        );
    });

};

module.exports = controller;