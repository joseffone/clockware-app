'use strict';

const routes = [
    require('./routes/clients')
];

module.exports = (app, db) => {
    return routes.forEach(route => {
        route(app, db);
    });
};