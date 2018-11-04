"use strict";

import tokensController from "./tokensController";

export default (db, refreshToken) => {
    return new Promise((resolve, reject) => {
        tokensController.checkRefreshToken(refreshToken)
            .then((decoded) => {
                db.keys.findAll({where: {
                    user_id: decoded.id}
                }).then((key) => {
                    if (key.length !== 0) {
                        if (key[0].refresh_token === refreshToken) {
                            return tokensController.getTokens({
                                id: decoded.id,
                                email: decoded.email,
                                first_name: decoded.first_name,
                                last_name: decoded.last_name
                            }).then(({accessToken, refreshToken}) => {
                                let userId = decoded.id;
                                resolve({userId, accessToken, refreshToken});
                            }, (err) => {
                                reject(err);
                            });
                        }
                    }
                    reject();
                }).catch((err) => {
                    reject(err);
                });
            }, (err) => {
                reject(err);
            });
    });
};