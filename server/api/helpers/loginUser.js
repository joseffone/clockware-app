'use strict';

import bcrypt from 'bcrypt';
import tokensController from './tokensController';

export default (db, dataObj) => {
    return new Promise((resolve, reject) => {
        db.users.findAll({where: {email: dataObj.email}})
            .then((user) => {
                if (user.length === 0) {
                    return reject();
                }
                bcrypt.compare(dataObj.password, user[0].password, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    if (!result) {
                        return reject();
                    }

                    return db.permissions.findAll({where: {role_id: user[0].role_id}})
                        .then((permissions) => {

                            return tokensController.getTokens({
                                userData: {
                                    id: user[0].id,
                                    email: user[0].email,
                                    first_name: user[0].first_name,
                                    last_name: user[0].last_name,
                                    role_id: user[0].role_id,
                                    permissions: [
                                        ...permissions.map((element) => {
                                            return {
                                                model: element.model,
                                                action: element.action
                                            };
                                        })
                                    ]
                                }
                            }).then(({accessToken, refreshToken}) => {
                                let userId = user[0].id;
                                resolve({userId, accessToken, refreshToken});
                            }, (err) => {
                                reject(err);
                            });

                        })
                        .catch((err) => {
                            reject(err);
                        });

                });
            })
            .catch((err) => {
                reject(err);
            });
    });
};

