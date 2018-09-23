'use strict'

import ClocksController from '../../controllers/clocks'
import authorize from '../../middlewares/authorize'

module.exports = (app, db) => {

    ClocksController.db = db;
    app.get('/clocks', ClocksController.getItems);
    app.get('/clock/:id', ClocksController.getItemById);
    app.post('/clock', authorize, ClocksController.createItem);
    app.patch('/clock/:id', authorize, ClocksController.updateItem);
    app.delete('/clock/:id', authorize, ClocksController.deleteItem);

};