'use strict';

import 'dotenv/config';
import bcrypt from 'bcrypt';
import errorWrapper from '../../helpers/errorWrapper';
import checkOrder from '../../helpers/ordersChecker';

export default (db, modelName) => {
    return (req, res) => {

        let queryParams = {};
        queryParams.where = {id: req.params.id};
        queryParams.paranoid = false;

        const attributes = Object.keys(db[modelName].rawAttributes);
        let errMessage = 'No valid entry found for provided ID';

        bcrypt.hash(req.body.password, +process.env.BCRYPT_SALT_ROUNDS, (err, hash) => {

            if (err) {
                if (req.body.password !== undefined) {
                    return errorWrapper(err, res, null);
                }
            }

            //checking and updating orders must be performed within one transaction with serializable isolation level
            //so other users can not create and update orders until current transaction is completed
            //this is needed to avoid data inconsistency
            db.sequelize.transaction({
                isolationLevel: db.Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
            }, (t) => {
                queryParams.transaction = t;
                return db[modelName].findAll(queryParams)
                    .then((fetchedElem) => {
                        if (fetchedElem.length !== 0) {

                            for (const key in req.body) {

                                const attrCounter = attributes.filter((attr) => {
                                    return attr === key;
                                }).length;
    
                                if (attrCounter !== 0) {
                                    if (key === 'password') {
                                        fetchedElem[0].setDataValue(key, hash);
                                    } else {
                                        fetchedElem[0].setDataValue(key, req.body[key]);
                                    }
                                }
    
                            }

                            return checkOrder(db, modelName, {...fetchedElem[0].dataValues}, t, true)
                                .then((t) => {
                                    return fetchedElem[0].save({paranoid: false, transaction: t});
                                }, (orders) => {
                                    errMessage = 'Order updating terminated. Chosen agent is already reserved for provided time interval.';
                                    if (!orders) {
                                        errMessage = 'Request contains invalid data.';
                                    }
                                    const error = new Error(errMessage);
                                    error.status = 404;
                                    throw error;
                                });

                        } else {
                            const error = new Error(errMessage);
                            error.status = 404;
                            throw error;
                        }
                    }, {transaction: t});
            }).then ((updatedElem) => {
                if (updatedElem.password) {
                    updatedElem.password = 'secret';
                }
                res.status(200).json(updatedElem);
            }).catch((err) => {
                errorWrapper(err, res, null);
            });

        });
    };
};