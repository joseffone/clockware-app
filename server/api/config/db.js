'use strict'

import 'dotenv/config';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//models (tables)
db.clients = require('../models/clients')(sequelize, Sequelize);
db.clocks = require('../models/clocks')(sequelize, Sequelize);
db.marks = require('../models/marks')(sequelize, Sequelize);
db.agents = require('../models/agents')(sequelize, Sequelize);
db.cities = require('../models/cities')(sequelize, Sequelize);
db.coverage = require('../models/coverage')(sequelize, Sequelize);
db.orders = require('../models/orders')(sequelize, Sequelize);
db.users = require('../models/users')(sequelize, Sequelize);

module.exports = db;