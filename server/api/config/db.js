'use strict';

import 'dotenv/config';
import Sequelize from 'sequelize';
import Users from '../models/users';
import Roles from '../models/roles';
import Permissions from '../models/permissions';
import Keys from '../models/keys';
import Clocks from '../models/clocks';
import Marks from '../models/marks';
import Agents from '../models/agents';
import Cities from '../models/cities';
import Coverage from '../models/coverage';
import Orders from '../models/orders';

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
db.roles = Roles(sequelize, Sequelize);
db.users = Users(sequelize, Sequelize);
db.keys = Keys(sequelize, Sequelize);
db.permissions = Permissions(sequelize, Sequelize);
db.clocks = Clocks(sequelize, Sequelize);
db.marks = Marks(sequelize, Sequelize);
db.agents = Agents(sequelize, Sequelize);
db.cities = Cities(sequelize, Sequelize);
db.coverage = Coverage(sequelize, Sequelize);
db.orders = Orders(sequelize, Sequelize);

export default db;