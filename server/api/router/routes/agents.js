'use strict'

import AgentsController from '../../controllers/agents'

module.exports = (app, db) => {

    AgentsController.db = db;
    app.get('/agents', AgentsController.getItems);
    app.get('/agent/:id', AgentsController.getItemById);
    app.post('/agent', AgentsController.createItem);
    app.patch('/agent/:id', AgentsController.updateItem);
    app.delete('/agent/:id', AgentsController.deleteItem);

};