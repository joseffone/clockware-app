'use strict'

import OrderController from '../../controllers/orders'

module.exports = (app, db) => {

    OrderController.db = db;
    app.get('/orders', OrderController.getItems);
    app.get('/order/:id', OrderController.getItemById);
    app.post('/order', OrderController.createItem);
    app.patch('/order/:id', OrderController.updateItem);
    app.delete('/order/:id', OrderController.deleteItem);

};