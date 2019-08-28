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