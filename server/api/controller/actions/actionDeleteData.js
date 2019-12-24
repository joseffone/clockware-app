'use strict';

import errorWrapper from '../../helpers/errorWrapper';

export default (db, modelName) => {
    return (req, res) => {

        let errorMessage = 'No valid entry found for provided ID';
        let queryParams = {};
        queryParams.where = {id: [req.params.id]};
        if (!req.params.id) {
            queryParams.where = {...req.query};
            errorMessage = 'No entries found';
        }
        if (modelName === 'users') {
            req.query = req.query.id ? {...req.query} : {id: ''};
            req.params.id = req.params.id ? req.params.id : '';
            if (req.params.id.toString() === req.userData.id.toString() || req.query.id.includes(req.userData.id.toString())) {
                const error = new Error('Deleting active user is not allowed.');
                error.status = 403;
                return errorWrapper(error, res, null);
            }
        }
        db[modelName].destroy(queryParams)
            .then((delCount) => {
                if (delCount >= 1) {
                    res.status(200).json({
                        ...queryParams.where,
                        quantity: delCount
                    });
                } else {
                    errorWrapper(null, res, errorMessage);
                }
            })
            .catch((err) => {
                errorWrapper(err, res, null);
            });
            
    };
};