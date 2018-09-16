'use strict'

const controller = {};

controller.getItems = (req, res) => {

    const filter = req.query;
        
    controller.db.cities.findAll({where: filter, paranoid: false})
    .then(city => {
        if (city.length !== 0) {
            res.status(200).json(city);
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

    controller.db.cities.findAll({where: {id: id}, paranoid: false})
    .then(city => {
        if (city.length !== 0) {
            res.status(200).json(city);
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

    const cityName = req.body.city_name;

    controller.db.cities.findOrCreate({where: {city_name: cityName}})
    .then(newCity => {
        res.status(201).json(newCity);

    })
    .catch(err => {
        res.status(500).json(
            {error: err}
        )
    });

};

controller.updateItem = (req, res) => {

    const id = req.params.id;
    const attributes = Object.keys(controller.db.cities.rawAttributes);

    controller.db.cities.findAll({where: {id: id}, paranoid: false})
    .then(city => {
        if (city.length !== 0) {
      
            for (const key in req.body) {
                const attrCounter = attributes.filter(function(attr){
                    return attr === key;
                }).length;

                if (attrCounter !== 0) {
                    city[0].setDataValue(key, req.body[key]);
                }
            }
            
            return city[0].save({ paranoid: false });
        } else {
            res.status(404).json(
                {
                    error: {message: "No valid entry found for provided ID"}
                }
            );
        }
    })
    .then (city => {
        res.status(200).json(city);
    })
    .catch(err => {
        res.status(500).json(
            {error: err}
        )
    });

};

controller.deleteItem = (req, res) => {
    
    const id = req.params.id;

    controller.db.cities.destroy({where: {id: id}})
    .then(deletedCity => {
        if (deletedCity === 1) {
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