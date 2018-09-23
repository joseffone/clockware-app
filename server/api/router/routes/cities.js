'use strict'

import CitiesController from '../../controllers/cities'
import authorize from '../../middlewares/authorize'

module.exports = (app, db) => {

    CitiesController.db = db;
    app.get('/cities', CitiesController.getItems);
    app.get('/city/:id', CitiesController.getItemById);
    app.post('/city', authorize, CitiesController.createItem);
    app.patch('/city/:id', authorize, CitiesController.updateItem);
    app.delete('/city/:id', authorize, CitiesController.deleteItem);

};