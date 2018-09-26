'use strict'

import KeysController from '../../controllers/keys'
import authorize from '../../middlewares/authorize'

module.exports = (app, db) => {

    KeysController.db = db;
    app.patch('/user/refresh/:userId', KeysController.updateItem);
    app.delete('/user/logout/:userId', authorize, KeysController.deleteItem);

};