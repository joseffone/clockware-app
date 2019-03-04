'use strict';

import errorWrapper from '../../helpers/errorWrapper';

export default (db, modelName) => {
    return (req, res) => {

        let queryParams = {};
        queryParams.where = {id: req.params.id};
    
        let successMessage = 'Entry deleted successfully';
        let errorMessage = 'No valid entry found for provided ID';
        
        if (modelName === 'keys') {
            successMessage = 'Logout successfully';
        }

        db[modelName].destroy(queryParams)
            .then((delCount) => {
                if (delCount === 1) {
                    res.status(200).json({
                        message: successMessage
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