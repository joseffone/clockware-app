const envExample = require('dotenv');
const express = require('express');
const db = require('./api/config/db');
const app = express();

envExample.config();

app.set('port', 3001);

app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`);
  db.sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  db.sequelize
    .sync()
    .then(() => {
      console.log('Database has been updated successfully.');
    })
    .catch(err => {
      console.error('Unable to update the database:', err);
    });
});  
