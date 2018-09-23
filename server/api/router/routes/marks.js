'use strict'

import MarksController from '../../controllers/marks'
import authorize from '../../middlewares/authorize'

module.exports = (app, db) => {

    MarksController.db = db;
    app.get('/marks', MarksController.getItems);
    app.get('/mark/:id', MarksController.getItemById);
    app.post('/mark', authorize, MarksController.createItem);
    app.patch('/mark/:id', authorize, MarksController.updateItem);
    app.delete('/mark/:id', authorize, MarksController.deleteItem);

};