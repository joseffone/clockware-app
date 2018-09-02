'use strict';

import ClientsController from '../../controllers/clients'

module.exports = (app, db) => {

    ClientsController.db = db;
    app.get('/clients', ClientsController.getItems);
    app.get('/client/:id', ClientsController.getItemById);
    app.post('/client', ClientsController.createItem);
    app.patch('/client/:id', ClientsController.updateItem);
    app.delete('/client/:id', ClientsController.deleteItem);

};