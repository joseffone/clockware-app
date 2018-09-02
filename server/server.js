import 'dotenv/config';
import bodyParser from 'body-parser';
import express from 'express';
import db from './api/config/db';
import router from './api/router/router';

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header(
     "Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});

router(app, db);

app.use((req, res, next) => {
   const error = new Error("Not found");
   error.status = 404;
   next(error);
});

app.use((error, req, res, next) => {
   res.status(error.status || 500);
   res.json({
      error: {
        message: error.message
      }
   });
});

app.set('port', process.env.SERVER_PORT);

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
      console.log('Data has been synchronized successfully.');
    })
    .catch(err => {
      console.error('Synchronization failed:', err);
    });
});  
