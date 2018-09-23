'use strict'

import ClientsController from '../../controllers/clients'
import authorize from '../../middlewares/authorize'

module.exports = (app, db) => {

    ClientsController.db = db;
    app.get('/clients', ClientsController.getItems);
    app.get('/client/:id', ClientsController.getItemById);
    app.post('/client', authorize, ClientsController.createItem);
    app.patch('/client/:id', authorize, ClientsController.updateItem);
    app.delete('/client/:id', authorize, ClientsController.deleteItem);

};