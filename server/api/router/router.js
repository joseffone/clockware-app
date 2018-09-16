'use strict'

const routes = [
    require('./routes/clients'),
    require('./routes/clocks'),
    require('./routes/cities'),
    require('./routes/marks'),
    require('./routes/agents'),
    require('./routes/coverage'),
    require('./routes/orders'),
    require('./routes/users')
];

module.exports = (app, db) => {
    return routes.forEach(route => {
        route(app, db);
    });
};