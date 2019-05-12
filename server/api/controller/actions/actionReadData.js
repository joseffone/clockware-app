'use strict';

import errorWrapper from '../../helpers/errorWrapper';

export default (db, modelName) => {
    return (req, res) => {

        let queryParams = {};
        queryParams.where = {id: req.params.id};
        queryParams.paranoid = false;

        let errorMessage = 'No valid entry found for provided ID';

        if (!queryParams.where.id) {
            queryParams.where = {...req.query.where};
            if (req.query.offset) {
                queryParams.offset = +req.query.offset;
            }
            if (req.query.limit) {
                queryParams.limit = +req.query.limit;
            }
            errorMessage = 'No entries found';
        }
    
        db[modelName].findAll(queryParams)
            .then((fetchedElems) => {
                if (fetchedElems.length !== 0) {
                    if (fetchedElems[0].password) {
                        fetchedElems.forEach((element) => {
                            element.password = 'secret';
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