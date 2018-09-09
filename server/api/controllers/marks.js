'use strict'

const controller = {};

controller.getItems = (req, res) => {

    const filter = req.query;
        
    controller.db.marks.findAll({where: filter, paranoid: false})
    .then(mark => {
        if (mark.length !== 0) {
            res.status(200).json(mark);
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

    controller.db.marks.findAll({where: {id: id}, paranoid: false})
    .then(mark => {
        if (mark.length !== 0) {
            res.status(200).json(mark);
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

    const markName = req.body.mark_name;
    const markValue = req.body.mark_value;

    controller.db.marks.findOrCreate(
    {
        where: {mark_name: markName},
        defaults: {
            mark_value: markValue
        }
    })
    .then(newMark => {
        res.status(201).json(newMark);

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

    controller.db.marks.findAll({where: {id: id}, paranoid: false})
    .then(mark => {
        if (mark.length !== 0) {
      
            for (const key in req.body) {
                const attrCounter = attributes.filter(function(attr){
                    return attr == key;
                }).length;

                if (attrCounter == 0) {
                    mark[0].setDataValue(key, req.body[key]);
                }
            }
            
            return mark[0].save({ paranoid: false });
        } else {
            res.status(404).json(
                {
                    error: {message: "No valid entry found for provided ID"}
                }
            );
        }
    })
    .then (mark => {
        res.status(200).json(mark);
    })
    .catch(err => {
        res.status(500).json(
            {error: err.message}
        )
    });

};

controller.deleteItem = (req, res) => {
    
    const id = req.params.id;

    controller.db.marks.destroy({where: {id: id}})
    .then(deletedMark => {
        if (deletedMark === 1) {
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