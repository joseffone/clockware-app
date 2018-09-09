'use strict'

import MarksController from '../../controllers/marks'

module.exports = (app, db) => {

    MarksController.db = db;
    app.get('/marks', MarksController.getItems);
    app.get('/mark/:id', MarksController.getItemById);
    app.post('/mark', MarksController.createItem);
    app.patch('/mark/:id', MarksController.updateItem);
    app.delete('/mark/:id', MarksController.deleteItem);

};