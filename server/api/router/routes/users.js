'use strict'

import UsersController from '../../controllers/users'
import authorize from '../../middlewares/authorize'

module.exports = (app, db) => {

    UsersController.db = db;
    app.get('/users', UsersController.getItems);
    app.get('/user/:id', UsersController.getItemById);
    app.post('/user/signup', UsersController.createItem);
    app.post('/user/login', UsersController.checkItem);
    app.patch('/user/:id', authorize, UsersController.updateItem);
    app.delete('/user/:id', authorize, UsersController.deleteItem);

};