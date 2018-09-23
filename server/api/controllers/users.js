'use strict'

const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const controller = {};

controller.getItems = (req, res) => {
        
    controller.db.users.findAll({attributes:['id', 'email']})
    .then(user => {
        if (user.length !== 0) {
            res.status(200).json(user);
        } else {
            res.status(404).json(
                {
                    error: {message: "No entries found"}
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

controller.getItemById = (req, res) => {
    
    const id = req.params.id;

    controller.db.users.findAll({attributes:['id', 'email'], where: {id: id}})
    .then(user => {
        if (user.length !== 0) {
            res.status(200).json(user);
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

controller.createItem = (req, res) => {

    const email = req.body.email;
    const pass = req.body.password;

    bcrypt.hash(pass, 10, (err, hash) => {

        if (err) {
            return res.status(500).json(
                {error: err}
            )
        }
        
        controller.db.users.findOrCreate(
            {
                where: {email: email},
                defaults: {
                    password: hash
                }
            })
            .then(newUser => {
                res.status(201).json(
                    {
                        id: newUser[0].id,
                        email: newUser[0].email
                    }
                );
            })
            .catch(err => {
                res.status(500).json(
                    {error: err}
                );
            });
        }
    );

};

controller.updateItem =  (req, res) => {

    const id = req.params.id;
    const attributes = Object.keys(controller.db.users.rawAttributes);
    let pass = req.body['password'];
    
    bcrypt.hash(pass, 10, (err, hash) => {
            
        if (err) {
            if (pass !== undefined) {
                return res.status(500).json(
                    {error: err}
                );
            } 
        }

        controller.db.users.findAll({where: {id: id}})
        .then(user => {
            if (user.length !== 0) {
          
                for (const key in req.body) {
                    
                    const attrCounter = attributes.filter(function(attr){
                        return attr === key;
                    }).length;
    
                    if (attrCounter !== 0) {
                        if (key === 'password') {
                            user[0].setDataValue(key, hash);
                        } else {
                            user[0].setDataValue(key, req.body[key]);
                        }
                    }
    
                }

                return user[0].save();
            } else {
                res.status(404).json(
                    {
                        error: {message: "No valid entry found for provided ID"}
                    }
                );
            }
        })
        .then (user => {
            res.status(200).json(
                {
                    id: user.id,
                    email: user.email
                }
            );
        })
        .catch(err => {
            res.status(500).json(
                {error: err}
            );
        });
   
    });

};

controller.checkItem = (req, res) => {

    const email = req.body.email;
    const pass = req.body.password;

    controller.db.users.findAll({where: {email: email}})
    .then(user => {      
        if (user.length !== 0) { 
            bcrypt.compare(pass, user[0].password, async function(err, result) {  
                if (err) {
                    return res.status(401).json(
                        {
                            message: "Authentication failed"
                        }
                    );
                }
                if (result) {
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
                    await controller.db.keys.findOrCreate(
                        {
                            where: {user_id: user[0].id},
                            defaults: {
                                refresh_token: refreshToken
                            }
                        })
                        .then(key => {
                            key[0].setDataValue('refresh_token', refreshToken);
                            return key[0].save();
                        })
                    return res.status(200).json(
                        {
                            message: "Authentication successful",
                            access_token: accessToken,
                            refresh_token: refreshToken
                        }
                    );
                }
                res.status(401).json(
                    {
                        message: "Authentication failed"
                    }
                );
            });
        } else {
            res.status(401).json(
                {
                    message: "Authentication failed"
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

controller.deleteItem = (req, res) => {
    
    const id = req.params.id;

    controller.db.users.destroy({where: {id: id}})
    .then(deletedUser => {
        if (deletedUser === 1) {
            res.status(200).json(
                {
                    message: "Entry deleted successfully"
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