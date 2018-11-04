"use strict";

import errorWrapper from "../../helpers/errorWrapper";

export default (db, modelName) => {
    return (req, res) => {

        let filter = {
            id: req.params.id 
        };

        let errorMessage = "No valid entry found for provided ID";

        if (filter.id === undefined) {
            filter = {
                ...req.query
            };
            errorMessage = "No entries found";
        }

        let queryParams = {};
        queryParams.where = filter;
        queryParams.paranoid = false;
    
        db[modelName].findAll(queryParams)
            .then((fetchedElems) => {
                if (fetchedElems.length !== 0) {
                    if (fetchedElems[0].password) {
                        fetchedElems.forEach((element) => {
                            element.password = "secret";
                        });
                    }
                    res.status(200).json(fetchedElems);
                } else {
                    errorWrapper(null, res, errorMessage);
                }
            })
            .catch((err) => {
                errorWrapper(err, res, null);
            });
    
    };
};