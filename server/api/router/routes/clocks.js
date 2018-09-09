'use strict'

import ClocksController from '../../controllers/clocks'

module.exports = (app, db) => {

    ClocksController.db = db;
    app.get('/clocks', ClocksController.getItems);
    app.get('/clock/:id', ClocksController.getItemById);
    app.post('/clock', ClocksController.createItem);
    app.patch('/clock/:id', ClocksController.updateItem);
    app.delete('/clock/:id', ClocksController.deleteItem);

};