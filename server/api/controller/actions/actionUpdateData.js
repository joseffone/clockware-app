"use strict";

import "dotenv/config";
import bcrypt from "bcrypt";
import errorWrapper from "../../helpers/errorWrapper";

export default (db, modelName) => {
    return (req, res) => {

        let queryParams = {};
        queryParams.where = {id: req.params.id};
        queryParams.paranoid = false;

        const attributes = Object.keys(db[modelName].rawAttributes);
        let errorMessage = "No valid entry found for provided ID";

        bcrypt.hash(req.body.password, +process.env.BCRYPT_SALT_ROUNDS, (err, hash) => {

            if (err) {
                if (req.body.password !== undefined) {
                    return errorWrapper(err, res, null);
                }
            }

            db[modelName].findAll(queryParams)
                .then((fetchedElem) => {
                    if (fetchedElem.length !== 0) {
                        for (const key in req.body) {

                            const attrCounter = attributes.filter((attr) => {
                                return attr === key;
                            }).length;

                            if (attrCounter !== 0) {
                                if (key === "password") {
                                    fetchedElem[0].setDataValue(key, hash);
                                } else {
                                    fetchedElem[0].setDataValue(key, req.body[key]);
                                }
                            }

                        }
                        return fetchedElem[0].save({paranoid: false});
                    } else {
                        errorWrapper(null, res, errorMessage);
                    }
                })
                .then ((updatedElem) => {
                    if (updatedElem.password) {
                        updatedElem.password = "secret";
                    }
                    res.status(200).json(updatedElem);
                })
                .catch((err) => {
                    errorWrapper(err, res, null);
                });
        });
    };
};