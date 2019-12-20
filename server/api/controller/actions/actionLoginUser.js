'use strict';

import loginUser from '../../helpers/loginUser';
import tokensController from '../../helpers/tokensController';
import errorWrapper from '../../helpers/errorWrapper';

export default (db) => {
    return (req, res) => {
        loginUser(db, req.body)
            .then(({userId, accessToken, refreshToken}) => {
                db.keys.findOrCreate({
                    where: {
                        user_id: userId
                    },
                    defaults: {
                        refresh_token: refreshToken
                    }
                }).then((key) => {
                    if (!key[1]) {
                        key[0].setDataValue('refresh_token', refreshToken);
                        return key[0].save();
                    }
                    return;
                }).then(() => {
                    res.status(200).json({
                        message: 'Authentication successful',
                        access_token: accessToken,
                        access_token_iat: tokensController.getIatTime(accessToken),
                        access_token_exp: tokensController.getExpTime(accessToken),
                        refresh_token: refreshToken,
                        refresh_token_iat: tokensController.getIatTime(refreshToken),
                        refresh_token_exp: tokensController.getExpTime(refreshToken),
                        user_id: userId
                    });
                }).catch((err) => {
                    errorWrapper(err, res, null);
                });
            }, (err) => {
                errorWrapper(err, res, 'Authentication failed');
            });
    };
};