'use strict';

export default (userId, action, modelName, db) => {
    return new Promise((resolve, reject) => {
        db.users.findAll({where: {id: userId}, paranoid: false})
            .then(async (user) => {
                let roleId = undefined;
                let clientRoleId = undefined;
                if (user.length === 0) {
                    //user is not defined; set roles by default
                    //the roles are assumed to be initially created and stored in the database
                    await db.roles.findAll({
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
                        })
                        .catch((err) => {
                            reject(err);
                        });
                } else {
                    //user exists so get its role id
                    roleId = user[0].role_id;
                }
                //check if there is permission to perform the action
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
    });
};