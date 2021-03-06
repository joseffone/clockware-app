'use strict';

import verifyUser from '../middlewares/verifyAccessToken';
import checkFreeAgents from '../middlewares/checkFreeAgents';
import getUserKeyId from '../middlewares/getUserKeyId';
import controller from '../controller/controller';

export default (app, db) => {
    //USERS
    app.get('/users', verifyUser, controller.readData(db, 'users'));
    app.get('/user/:id', verifyUser, controller.readData(db, 'users'));
    app.post('/signup', verifyUser, controller.createData(db, 'users'));
    app.patch('/user/:id', verifyUser, controller.updateData(db, 'users'));
    app.delete('/user/:id', verifyUser, controller.deleteData(db, 'users'));
    app.delete('/users', verifyUser, controller.deleteData(db, 'users'));

    //KEYS
    app.get('/refresh', controller.refreshTokens(db));
    app.post('/login', controller.loginUser(db));
    app.delete('/logout', verifyUser, getUserKeyId(db), controller.deleteData(db, 'keys'));

    //ROLES
    app.get('/roles', verifyUser, controller.readData(db, 'roles'));
    app.get('/role/:id', verifyUser, controller.readData(db, 'roles'));
    app.post('/role', verifyUser, controller.createData(db, 'roles'));
    app.patch('/role/:id', verifyUser, controller.updateData(db, 'roles'));
    app.delete('/role/:id', verifyUser, controller.deleteData(db, 'roles'));
    app.delete('/roles', verifyUser, controller.deleteData(db, 'roles'));

    //PERMISSIONS
    app.get('/permissions', verifyUser, controller.readData(db, 'permissions'));
    app.get('/permission/:id', verifyUser, controller.readData(db, 'permissions'));
    app.post('/permission', verifyUser, controller.createData(db, 'permissions'));
    app.patch('/permission/:id', verifyUser, controller.updateData(db, 'permissions'));
    app.delete('/permission/:id', verifyUser, controller.deleteData(db, 'permissions'));
    app.delete('/permissions', verifyUser, controller.deleteData(db, 'permissions'));

    //AGENTS
    app.get('/agents', verifyUser, controller.readData(db, 'agents'));
    app.get('/freeagents', verifyUser, checkFreeAgents(db), controller.readData(db, 'agents'));
    app.get('/agent/:id', verifyUser, controller.readData(db, 'agents'));
    app.post('/agent', verifyUser, controller.createData(db, 'agents'));
    app.patch('/agent/:id', verifyUser, controller.updateData(db, 'agents'));
    app.delete('/agent/:id', verifyUser, controller.deleteData(db, 'agents'));
    app.delete('/agents', verifyUser, controller.deleteData(db, 'agents'));

    //MARKS
    app.get('/marks', verifyUser, controller.readData(db, 'marks'));
    app.get('/mark/:id', verifyUser, controller.readData(db, 'marks'));
    app.post('/mark', verifyUser, controller.createData(db, 'marks'));
    app.patch('/mark/:id', verifyUser, controller.updateData(db, 'marks'));
    app.delete('/mark/:id', verifyUser, controller.deleteData(db, 'marks'));
    app.delete('/marks', verifyUser, controller.deleteData(db, 'marks'));
    
    //CLOCKS
    app.get('/clocks', verifyUser, controller.readData(db, 'clocks'));
    app.get('/clock/:id', verifyUser, controller.readData(db, 'clocks'));
    app.post('/clock', verifyUser, controller.createData(db, 'clocks'));
    app.patch('/clock/:id', verifyUser, controller.updateData(db, 'clocks'));
    app.delete('/clock/:id', verifyUser, controller.deleteData(db, 'clocks'));
    app.delete('/clocks', verifyUser, controller.deleteData(db, 'clocks'));

    //CITIES
    app.get('/cities', verifyUser, controller.readData(db, 'cities'));
    app.get('/city/:id', verifyUser, controller.readData(db, 'cities'));
    app.post('/city', verifyUser, controller.createData(db, 'cities'));
    app.patch('/city/:id', verifyUser, controller.updateData(db, 'cities'));
    app.delete('/city/:id', verifyUser, controller.deleteData(db, 'cities'));
    app.delete('/cities', verifyUser, controller.deleteData(db, 'cities'));

    //COVERAGE
    app.get('/coverage', verifyUser, controller.readData(db, 'coverage'));
    app.get('/coverage/:id', verifyUser, controller.readData(db, 'coverage'));
    app.post('/coverage', verifyUser, controller.createData(db, 'coverage'));
    app.patch('/coverage/:id', verifyUser, controller.updateData(db, 'coverage'));
    app.delete('/coverage/:id', verifyUser, controller.deleteData(db, 'coverage'));
    app.delete('/coverage', verifyUser, controller.deleteData(db, 'coverage'));

    //ORDERS
    app.get('/orders', verifyUser, controller.readData(db, 'orders'));
    app.get('/order/:id', verifyUser, controller.readData(db, 'orders'));
    app.post('/order', verifyUser, controller.createData(db, 'orders'));
    app.patch('/order/:id', verifyUser, controller.updateData(db, 'orders'));
    app.patch('/orders/confirm', verifyUser, controller.updateData(db, 'orders'));
    app.delete('/order/:id', verifyUser, controller.deleteData(db, 'orders'));
    app.delete('/orders', verifyUser, controller.deleteData(db, 'orders'));

    //EMAIL
    app.post('/email', verifyUser, controller.sendEmail(db));
};