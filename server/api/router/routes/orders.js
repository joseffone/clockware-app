'use strict'

import OrderController from '../../controllers/orders'
import authorize from '../../middlewares/authorize'

module.exports = (app, db) => {

    OrderController.db = db;
    app.get('/orders', OrderController.getItems);
    app.get('/order/:id', OrderController.getItemById);
    app.post('/order', authorize, OrderController.createItem);
    app.patch('/order/:id', authorize, OrderController.updateItem);
    app.delete('/order/:id', authorize, OrderController.deleteItem);

};