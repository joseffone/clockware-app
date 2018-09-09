'use strict'

import CoverController from '../../controllers/coverage'

module.exports = (app, db) => {

    CoverController.db = db;
    app.get('/coverage', CoverController.getItems);
    app.get('/coverage/:id', CoverController.getItemById);
    app.post('/coverage', CoverController.createItem);
    app.patch('/coverage/:id', CoverController.updateItem);
    app.delete('/coverage/:id', CoverController.deleteItem);

};