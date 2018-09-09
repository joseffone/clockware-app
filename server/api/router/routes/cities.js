'use strict'

import CitiesController from '../../controllers/cities'

module.exports = (app, db) => {

    CitiesController.db = db;
    app.get('/cities', CitiesController.getItems);
    app.get('/city/:id', CitiesController.getItemById);
    app.post('/city', CitiesController.createItem);
    app.patch('/city/:id', CitiesController.updateItem);
    app.delete('/city/:id', CitiesController.deleteItem);

};