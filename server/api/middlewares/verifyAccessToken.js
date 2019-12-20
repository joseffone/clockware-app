'use strict';

import tokensController from '../helpers/tokensController';
import errorWrapper from '../helpers/errorWrapper';

export default (req, res, next) => {
    let token = undefined;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (req.path === '/orders/confirm') {
        tokensController.checkConfirmToken(token)
            .then((decoded) => {
                req.userData = {...decoded.userData};
                req.params.id = decoded.order_id;
                req.body = {confirmed: 'Yes'};
                next();
            }, (err) => {
                if (token === undefined) {
                    req.userData = undefined;
                    return next();
                }
                errorWrapper(err, res, 'Authentication failed');
            });
    } else {
        tokensController.checkAccessToken(token)
            .then((decoded) => {
                req.userData = {...decoded.userData};
                next();
            }, (err) => {
                if (token === undefined) {
                    req.userData = undefined;
                    return next();
                }
                errorWrapper(err, res, 'Authentication failed');
            });
    }
};