"use strict";

import "dotenv/config";
import jwt from "jsonwebtoken";

export default {
    getTokens: (dataObj) => {
        return new Promise((resolve, reject) => {
            jwt.sign(dataObj, process.env.JWT_ACCESS_KEY, {expiresIn: 10*60}, (err, accessToken) => {
                if (err) {
                    return reject(err);
                }
                jwt.sign(dataObj, process.env.JWT_REFRESH_KEY, {expiresIn: "24h"}, (err, refreshToken) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve({accessToken, refreshToken});
                });
            });
        });
    },
    checkAccessToken: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                return resolve(decoded);
            });
        });
    },
    checkRefreshToken: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_REFRESH_KEY, (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                return resolve(decoded);
            });
        });
    }
};