'use strict';

import tokensController from '../helpers/tokensController';
import errorWrapper from '../helpers/errorWrapper';

export default (req, res, next) => {

    let accToken = undefined;

    if (req.headers.authorization) {
        accToken = req.headers.authorization.split(' ')[1];
    }

    tokensController.checkAccessToken(accToken)
        .then((decoded) => {
            req.userData = {...decoded.userData};
            next();
        }, (err) => {
            if (accToken === undefined) {
                req.userData = undefined;
                return next();
            }
            errorWrapper(err, res, 'Authentication failed');
        });

};