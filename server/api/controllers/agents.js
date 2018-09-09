'use strict'

const controller = {};

controller.getItems = (req, res) => {

    const filter = req.query;
        
    controller.db.agents.findAll({where: filter, paranoid: false})
    .then(agent => {
        if (agent.length !== 0) {
            res.status(200).json(agent);
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

    controller.db.agents.findAll({where: {id: id}, paranoid: false})
    .then(agent => {
        if (agent.length !== 0) {
            res.status(200).json(agent);
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
    const markID = req.body.mark_id;

    controller.db.agents.findOrCreate(
    {
        where: {
            first_name: firstName,
            last_name: lastName
        },
        defaults: {
            mark_id: markID
        }
    })
    .then(newAgent => {
        res.status(201).json(newAgent);

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

    controller.db.agents.findAll({where: {id: id}, paranoid: false})
    .then(agent => {
        if (agent.length !== 0) {
      
            for (const key in req.body) {
                 const attrCounter = attributes.filter(function(attr){
                    return attr == key;
                }).length;

                if (attrCounter == 0) {
                    agent[0].setDataValue(key, req.body[key]);
                }
            }
            
            return agent[0].save({ paranoid: false });
        } else {
            res.status(404).json(
                {
                    error: {message: "No valid entry found for provided ID"}
                }
            );
        }
    })
    .then (agent => {
        res.status(200).json(agent);
    })
    .catch(err => {
        res.status(500).json(
            {error: err.message}
        )
    });

};

controller.deleteItem = (req, res) => {
    
    const id = req.params.id;

    controller.db.agents.destroy({where: {id: id}})
    .then(deletedAgent => {
        if (deletedAgent === 1) {
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