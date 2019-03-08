'use strict';

import errorWrapper from '../helpers/errorWrapper';
import checkAccess from '../helpers/dataAccessChecker';
import actionLoginUser from './actions/actionLoginUser';
import actionRefreshTokens from './actions/actionRefreshTokens';
import actionReadData from './actions/actionReadData';
import actionCreateData from './actions/actionCreateData';
import actionUpdateData from './actions/actionUpdateData';
import actionDeleteData from './actions/actionDeleteData';

export default {
    readData: (db, modelName) => {
        return (req, res) => {
            checkAccess(req.userData, 'read', modelName, db).then(() => {
                actionReadData(db, modelName)(req, res);
            }, (err) => {
                errorWrapper(err, res, 'No access to READ data');
            });
        };
    },
    createData: (db, modelName) => {
        return (req, res) => {
            checkAccess(req.userData, 'create', modelName, db).then((clientRoleId) => {
                if (clientRoleId) {
                    req.body.role_id = clientRoleId;
                }
                actionCreateData(db, modelName)(req, res);
            }, (err) => {
                errorWrapper(err, res, 'No access to CREATE data');
            });
        };
    },
    updateData: (db, modelName) => {
        return (req, res) => {
            checkAccess(req.userData, 'update', modelName, db).then(() => {
                actionUpdateData(db, modelName)(req, res);
            }, (err) => {
                errorWrapper(err, res, 'No access to UPDATE data');
            });
        };
    },
    deleteData: (db, modelName) => {
        return (req, res) => {
            checkAccess(req.userData, 'delete', modelName, db).then(() => {
                actionDeleteData(db, modelName)(req, res);
            }, (err) => {
                errorWrapper(err, res, 'No access to DELETE data');
            });
        };
    },
    loginUser: (db) => {
        return (req, res) => {
            actionLoginUser(db)(req, res);
        };
    },
    refreshTokens: (db) => {
        return (req, res) => {
            actionRefreshTokens(db)(req, res);
        };
    }
};