"use strict";

import freeAgentsChecker from "../helpers/freeAgentsChecker";
import errorWrapper from "../helpers/errorWrapper";

export default (db) => {
    return (req, res, next) => {

        const dataObj = {};
        dataObj.city_id = req.query.city_id;
        dataObj.start_date = req.query.start_date;
        dataObj.eхpiration_date = req.query.expiration_date;

        freeAgentsChecker(db, dataObj)
            .then((freeAgentsIds) => {
                req.query = {where: {id: freeAgentsIds}};
                next();
            }, (err) => {
                errorWrapper(err, res, "No free agents available");
            });

    };
};