"use strict";

import refreshTokens from "../../helpers/refreshTokens";
import errorWrapper from "../../helpers/errorWrapper";

export default (db) => {
    return (req, res) => {
        
        let refToken = undefined;

        if (req.headers.authorization) {
            refToken = req.headers.authorization.split(" ")[1];
        }

        refreshTokens(db, refToken)
            .then(({userId, accessToken, refreshToken}) => {
                db.keys.findAll({
                    where: {
                        user_id: userId
                    }
                }).then((key) => {
                    if (key.length !== 0) {
                        key[0].setDataValue("refresh_token", refreshToken);
                        return key[0].save();
                    }
                    errorWrapper(null, res, "Authentication failed");
                }).then(() => {
                    res.status(200).json({
                        message: "Authentication successful",
                        access_token: accessToken,
                        refresh_token: refreshToken
                    });
                }).catch((err) => {
                    errorWrapper(err, res, null);
                });
            }, (err) => {
                errorWrapper(err, res, "Authentication failed");
            });

    };
};