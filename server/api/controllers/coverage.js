'use strict'

const controller = {};

controller.getItems = (req, res) => {

    const filter = req.query;
        
    controller.db.coverage.findAll({where: filter, paranoid: false})
    .then(con => {
        if (con.length !== 0) {
            res.status(200).json(con);
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

    controller.db.coverage.findAll({where: {id: id}, paranoid: false})
    .then(con => {
        if (con.length !== 0) {
            res.status(200).json(con);
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

    const agentID = req.body.agent_id;
    const cityID = req.body.city_id;

    controller.db.coverage.findOrCreate(
    {
        where: {
            agent_id: agentID,
            city_id: cityID
        }
    })
    .then(newCon => {
        res.status(201).json(newCon);

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

    controller.db.coverage.findAll({where: {id: id}, paranoid: false})
    .then(con => {
        if (con.length !== 0) {
            
            for (const key in req.body) {
                const attrCounter = attributes.filter(function(attr){
                    return attr == key;
                }).length;

                if (attrCounter == 0) {
                    con[0].setDataValue(key, req.body[key]);
                }
            }

            return con[0].save({ paranoid: false });
        } else {
            res.status(404).json(
                {
                    error: {message: "No valid entry found for provided ID"}
                }
            );
        }
    })
    .then (con => {
        res.status(200).json(con);
    })
    .catch(err => {
        res.status(500).json(
            {error: err.message}
        )
    });

};

controller.deleteItem = (req, res) => {
    
    const id = req.params.id;

    controller.db.coverage.destroy({where: {id: id}})
    .then(deletedCon => {
        if (deletedCon === 1) {
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
