'use strict'

const bcrypt =  require('bcrypt');
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
        )
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
        )
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
                    password: hash,
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
                )
            });
        }
    );

};

/*controller.updateItem = (req, res) => {

    const id = req.params.id;
    const attributes = Object.keys(controller.db.users.rawAttributes);



    console.log(attributes);

    controller.db.users.findAll({where: {id: id}})
    .then(user => {
        if (user.length !== 0) {
      
            for (const key in req.body) {
                
                const attrCounter = attributes.filter(function(attr){
                    return attr === key;
                }).length;

                console.log(attrCounter);

                if (attrCounter !== 0) {
                    if (key === 'password') {
                        bcrypt.hash(req.body[key], 10, (err, hash) => {
                            if (err) {
                                return res.status(500).json(
                                    {error: err}
                                )
                            }
                            user[0].setDataValue(key, hash);
                            console.log(1);
                        });
                    } else {
                        user[0].setDataValue(key, req.body[key]);
                    }
                }
                console.log(key);
            }
            console.log(2);
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
        console.log(3);
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
        )
    });

};*/

controller.checkItem = (req, res) => {

    const email = req.params.email;
    const pass = req.params.password;

    controller.db.users.findAll({where: {email: email}})
    .then(user => {
        if (user.length !== 0) {
            bcrypt.compare(pass, user[0].password, function(err, result) {
                if (err) {
                    return res.status(401).json(
                        {
                            message: "Authorization failed"
                        }
                    );
                }
                if (result) {
                    return res.status(200).json(
                        {
                            message: "Authorization successful"
                        }
                    );
                }
                res.status(401).json(
                    {
                        message: "Authorization failed"
                    }
                );
            });
        } else {
            res.status(401).json(
                {
                    message: "Authorization failed"
                }
            );
        }
    })
    .catch(err => {
        res.status(500).json(
            {error: err}
        )
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
        )
    });

};

module.exports = controller;