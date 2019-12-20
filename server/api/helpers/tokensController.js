'use strict';

import 'dotenv/config';
import jwt from 'jsonwebtoken';

export default {
    getTokens: (dataObj) => {
        return new Promise((resolve, reject) => {
            jwt.sign(dataObj, process.env.JWT_ACCESS_KEY, {expiresIn: process.env.JWT_ACCESS_EXP_IN}, (err, accessToken) => {
                if (err) {
                    return reject(err);
                }
                jwt.sign(dataObj, process.env.JWT_REFRESH_KEY, {expiresIn: process.env.JWT_REFRESH_EXP_IN}, (err, refreshToken) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve({accessToken, refreshToken});
                });
            });
        });
    },
    getConfirmToken: (dataObj) => {
        return new Promise((resolve, reject) => {
            jwt.sign(dataObj, process.env.JWT_CONFIRM_KEY, {expiresIn: process.env.JWT_CONFIRM_EXP_IN}, (err, confirmToken) => {
                if (err) {
                    return reject(err);
                }
                return resolve(confirmToken);
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
    },
    checkConfirmToken: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_CONFIRM_KEY, (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                return resolve(decoded);
            });
        });
    },
    getExpTime: (token) => {
        return jwt.decode(token).exp;
    },
    getIatTime: (token) => {
        return jwt.decode(token).iat;
    }
};