'use strict'

const controller = {};

controller.getItems = (req, res) => {

    const filter = req.query;
        
    controller.db.orders.findAll({where: filter, paranoid: false})
    .then(order => {
        if (order.length !== 0) {
            res.status(200).json(order);
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

    controller.db.orders.findAll({where: {id: id}, paranoid: false})
    .then(order => {
        if (order.length !== 0) {
            res.status(200).json(order);
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

    const clientID = req.body.client_id;
    const clockID = req.body.clock_id;
    const cityID = req.body.city_id;
    const agentID = req.body.agent_id;
    const startDate = req.body.start_date;
    const endDate = req.body.end_date;
    const status = req.body.status;
    const note = req.body.note;

    controller.db.orders.findOrCreate(
    {
        where: {
            client_id: clientID,
            clock_id: clockID,
            city_id: cityID,
            agent_id: agentID,
            start_date: startDate,
            end_date: endDate
        },
        defaults: {
            status: status,
            note: note
        }
    })
    .then(newOrder => {
        res.status(201).json(newOrder);

    })
    .catch(err => {
        res.status(500).json(
            {error: err}
        )
    });

};

controller.updateItem = (req, res) => {

    const id = req.params.id;
    const attributes = controller.db.coverage.primaryKeyAttributes;

    controller.db.orders.findAll({where: {id: id}, paranoid: false})
    .then(order => {
        if (order.length !== 0) {
      
            for (const key in req.body) {
                const attrCounter = attributes.filter(function(attr){
                    return attr == key;
                }).length;

                if (attrCounter == 0) {
                    order[0].setDataValue(key, req.body[key]);
                }
            }
            
            return order[0].save({ paranoid: false });
        } else {
            res.status(404).json(
                {
                    error: {message: "No valid entry found for provided ID"}
                }
            );
        }
    })
    .then (order => {
        res.status(200).json(order);
    })
    .catch(err => {
        res.status(500).json(
            {error: err.message}
        )
    });

};

controller.deleteItem = (req, res) => {
    
    const id = req.params.id;

    controller.db.orders.destroy({where: {id: id}})
    .then(deletedOrder => {
        if (deletedOrder === 1) {
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