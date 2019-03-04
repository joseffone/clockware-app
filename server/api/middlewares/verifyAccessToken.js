'use strict';
//////
import tokensController from '../helpers/tokensController';
import errorWrapper from '../helpers/errorWrapper';

export default (req, res, next) => {

    let accToken = undefined;

    if (req.headers.authorization) {
        accToken = req.headers.authorization.split(' ')[1];
    }
    console.log(tokensController.getExpTime(accToken));
    tokensController.checkAccessToken(accToken)
        .then((decoded) => {
            console.log(decoded);
            req.userData = {...decoded};
            next();
        }, (err) => {
            if (accToken === undefined) {
                req.userData = {id: undefined};
                return next();
            }
            errorWrapper(err, res, 'Authentication failed');
        });

};