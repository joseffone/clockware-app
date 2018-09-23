'use strict'

import CoverController from '../../controllers/coverage'
import authorize from '../../middlewares/authorize'

module.exports = (app, db) => {

    CoverController.db = db;
    app.get('/coverage', CoverController.getItems);
    app.get('/coverage/:id', CoverController.getItemById);
    app.post('/coverage', authorize, CoverController.createItem);
    app.patch('/coverage/:id', authorize, CoverController.updateItem);
    app.delete('/coverage/:id', authorize, CoverController.deleteItem);

};