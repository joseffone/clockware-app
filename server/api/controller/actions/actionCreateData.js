"use strict";

import "dotenv/config";
import bcrypt from "bcrypt";
import errorWrapper from "../../helpers/errorWrapper";
import checkOrder from "../../helpers/ordersChecker";

export default (db, modelName) => {
    return (req, res) => {

        let queryParams = {};
        queryParams.where = {};
        queryParams.defaults = {};

        switch (modelName) {
        case "cities":
            queryParams.where.city_name = req.body.city_name;
            break;
        case "clocks":
            queryParams.where.clock_type = req.body.clock_type;
            queryParams.defaults.hours_of_repair = req.body.hours_of_repair;
            break;
        case "marks":
            queryParams.where.mark_name = req.body.mark_name;
            queryParams.defaults.mark_value = req.body.mark_value;
            break;
        case "agents":
            queryParams.where.nickname = req.body.nickname;
            queryParams.defaults.first_name = req.body.first_name;
            queryParams.defaults.last_name = req.body.last_name;
            queryParams.defaults.mark_id = req.body.mark_id;
            break;
        case "coverage":
            queryParams.where.agent_id = req.body.agent_id;
            queryParams.where.city_id = req.body.city_id;
            break;
        case "orders":
            queryParams.where.user_id = req.body.user_id;
            queryParams.where.clock_id = req.body.clock_id;
            queryParams.where.city_id = req.body.city_id;
            queryParams.where.agent_id = req.body.agent_id;
            queryParams.where.start_date = req.body.start_date;
            queryParams.where.eхpiration_date = req.body.eхpiration_date;
            queryParams.defaults.note = req.body.note;
            break;
        case "users":
            queryParams.where.email = req.body.email;
            queryParams.defaults.first_name = req.body.first_name;
            queryParams.defaults.last_name = req.body.last_name;
            queryParams.defaults.password = req.body.password;
            queryParams.defaults.role_id = req.body.role_id;
            break;
        case "roles":
            queryParams.where.role = req.body.role;
            break;
        case "permissions":
            queryParams.where.role_id = req.body.role_id;
            queryParams.where.model = req.body.model;
            queryParams.where.action = req.body.action;
            break;
        case "keys":
            queryParams.where.user_id = req.body.user_id;
            queryParams.defaults.refresh_token = req.body.refresh_token;
            break;
        }

        bcrypt.hash(queryParams.defaults.password, +process.env.BCRYPT_SALT_ROUNDS, (err, hash) => {

            if (err) {
                if (queryParams.defaults.password !== undefined) {
                    return errorWrapper(err, res, null);
                }
            }

            queryParams.defaults.password = hash;

            //checking and creating orders must be performed within one transaction with serializable isolation level
            //so other users can not create and update orders until current transaction is completed
            //this is needed to avoid data inconsistency
            db.sequelize.transaction({
                isolationLevel: db.Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
            }, (t) => {
                return checkOrder(db, modelName, {...queryParams.where}, t, false)
                    .then((t) => {
                        queryParams.transaction = t;
                        return db[modelName].findOrCreate(queryParams)
                            .then((createdElem) => {
                                if (createdElem[0].password) {
                                    createdElem[0].password = "secret";
                                }
                                return createdElem;
                            }, {transaction: t});
                    }, (orders) => {
                        let errMessage = "Unable to create order with provided time interval";
                        if (!orders) {
                            errMessage = "Request contains invalid data";
                        }
                        const error = new Error(errMessage);
                        error.status = 404;
                        throw error;
                    });      
            }).then((createdElem) => {
                res.status(201).json(createdElem);
            }).catch((err) => {
                errorWrapper(err, res, null);
            });

        });   
    };
};