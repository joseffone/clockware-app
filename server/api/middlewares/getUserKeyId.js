'use strict';

import errorWrapper from '../helpers/errorWrapper';

export default (db) => {
    return (req, res, next) => {

        let errorMessage = 'No valid entry found for provided ID';
        let queryParams = {};
        queryParams.where = {user_id: req.userData.id};
   
        db.keys.findAll(queryParams)
            .then((fetchedElem) => {
                if (fetchedElem.length !== 0) {
                    req.params.id = fetchedElem[0].id;
                    return next();
                } else {
                    errorWrapper(null, res, errorMessage);
                }
            })
            .catch((err) => {
                errorWrapper(err, res, null);
            });

    };
};