'use strict'

const controller = {};

controller.getItems = (req, res) => {

    const filter = req.query;
        
    controller.db.clients.findAll({where: filter, paranoid: false})
    .then(client => {
        if (client.length !== 0) {
            res.status(200).json(client);
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

    controller.db.clients.findAll({where: {id: id}, paranoid: false})
    .then(client => {
        if (client.length !== 0) {
            res.status(200).json(client);
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

    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email;

    controller.db.clients.findOrCreate(
    {
        where: {email: email},
        defaults: {
            first_name: firstName,
            last_name: lastName
        }
    })
    .then(newClient => {
        res.status(201).json(newClient);

    })
    .catch(err => {
        res.status(500).json(
            {error: err}
        )
    });

};

controller.updateItem = (req, res) => {

    const id = req.params.id;
    const attributes = Object.keys(controller.db.clients.rawAttributes);

    controller.db.clients.findAll({where: {id: id}, paranoid: false})
    .then(client => {
        if (client.length !== 0) {
      
            for (const key in req.body) {
                const attrCounter = attributes.filter(function(attr){
                    return attr === key;
                }).length;

                if (attrCounter !== 0) {
                    client[0].setDataValue(key, req.body[key]);
                }
            }
            
            return client[0].save({ paranoid: false });
        } else {
            res.status(404).json(
                {
                    error: {message: "No valid entry found for provided ID"}
                }
            );
        }
    })
    .then (client => {
        res.status(200).json(client);
    })
    .catch(err => {
        res.status(500).json(
            {error: err}
        )
    });

};

controller.deleteItem = (req, res) => {
    
    const id = req.params.id;

    controller.db.clients.destroy({where: {id: id}})
    .then(deletedClient => {
        if (deletedClient === 1) {
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