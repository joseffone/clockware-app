'use strict';

import tokensController from './tokensController';

export default (db, refreshToken) => {
    return new Promise((resolve, reject) => {
        tokensController.checkRefreshToken(refreshToken)
            .then((decoded) => {
                db.keys.findAll({where: {
                    user_id: decoded.userData.id}
                }).then((key) => {
                    if (key.length !== 0) {
                        if (key[0].refresh_token === refreshToken) {
                            return tokensController.getTokens({
                                userData: {
                                    ...decoded.userData,
                                    permissions: [
                                        ...decoded.userData.permissions
                                    ]
                                }
                            }).then(({accessToken, refreshToken}) => {
                                let userId = decoded.userData.id;
                                resolve({userId, accessToken, refreshToken});
                            }, (err) => {
                                reject(err);
                            });
                        }
                    }
                    const error = new Error();
                    error.status = 401;
                    reject(error);
                }).catch((err) => {
                    reject(err);
                });
            }, (err) => {
                reject(err);
            });
    });
};