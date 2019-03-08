'use strict';

export default (userData, action, modelName, db) => {
    return new Promise((resolve, reject) => {

        if (!userData) {
            let roleId, clientRoleId;
            //user is not defined; set roles by default
            //the roles are assumed to be initially created and stored in the database
            db.roles.findAll({
                where: {
                    role: ['user', 'client']
                }})
                .then((role) => {
                    role.forEach(element => {
                        if (element.role === 'user') {
                            //get user role id to use it for reaching data by default
                            //also it is used to create users whith client status
                            roleId = element.id;
                        } else {
                            //get client role id to provide it as default role id while creating clients by unsigned user
                            clientRoleId = element.id;
                        }
                    });
                    return db.permissions.findAll({
                        where: {
                            role_id: roleId,
                            model: modelName,
                            action: action
                        }})
                        .then((permission) => {
                            if (permission.length !== 0) {
                                resolve(clientRoleId);
                            } else {
                                reject();
                            }
                        })
                        .catch((err) => {
                            reject(err);
                        });
                })
                .catch((err) => {
                    reject(err);
                });
        } else {
            if (userData.permissions.filter((permission) => {
                return (permission.model === modelName) && (permission.action === action);
            }).length > 0) {
                resolve();
            } else {
                reject();
            }
        }

    });
};