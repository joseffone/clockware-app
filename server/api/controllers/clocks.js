'use strict'

const controller = {};

controller.getItems = (req, res) => {

    const filter = req.query;
        
    controller.db.clocks.findAll({where: filter, paranoid: false})
    .then(clock => {
        if (clock.length !== 0) {
            res.status(200).json(clock);
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

    controller.db.clocks.findAll({where: {id: id}, paranoid: false})
    .then(clock => {
        if (clock.length !== 0) {
            res.status(200).json(clock);
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

    const clockType = req.body.clock_type;
    const hoursOfRepair = req.body.hours_of_repair;

    controller.db.clocks.findOrCreate(
    {
        where: {clock_type: clockType},
        defaults: {
            hours_of_repair: hoursOfRepair
        }
    })
    .then(newClock => {
        res.status(201).json(newClock);

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

    controller.db.clocks.findAll({where: {id: id}, paranoid: false})
    .then(clock => {
        if (clock.length !== 0) {
      
            for (const key in req.body) {
                const attrCounter = attributes.filter(function(attr){
                    return attr == key;
                }).length;

                if (attrCounter == 0) {
                    clock[0].setDataValue(key, req.body[key]);
                }
            }
            
            return clock[0].save({ paranoid: false });
        } else {
            res.status(404).json(
                {
                    error: {message: "No valid entry found for provided ID"}
                }
            );
        }
    })
    .then (clock => {
        res.status(200).json(clock);
    })
    .catch(err => {
        res.status(500).json(
            {error: err.message}
        )
    });

};

controller.deleteItem = (req, res) => {
    
    const id = req.params.id;

    controller.db.clocks.destroy({where: {id: id}})
    .then(deletedClock => {
        if (deletedClock === 1) {
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