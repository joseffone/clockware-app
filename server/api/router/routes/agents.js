'use strict'

import AgentsController from '../../controllers/agents'
import authorize from '../../middlewares/authorize'

module.exports = (app, db) => {

    AgentsController.db = db;
    app.get('/agents', AgentsController.getItems);
    app.get('/agent/:id', AgentsController.getItemById);
    app.post('/agent', authorize, AgentsController.createItem);
    app.patch('/agent/:id', authorize, AgentsController.updateItem);
    app.delete('/agent/:id', authorize, AgentsController.deleteItem);

};