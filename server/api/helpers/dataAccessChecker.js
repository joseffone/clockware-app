"use strict";

export default (userId, action, modelName, db) => {
    return new Promise((resolve, reject) => {
        db.users.findAll({where: {id: userId}, paranoid: false})
            .then(async (user) => {
                let roleId = undefined;
                let clientRoleId = undefined;
                if (user.length === 0) {
                    await db.roles.findAll({
                        where: {
                            role: ["user", "client"]
                        }})
                        .then((role) => {
                            role.forEach(element => {
                                if (element.role === "user") {
                                    roleId = element.id;
                                } else {
                                    clientRoleId = element.id;
                                }
                            });
                        })
                        .catch((err) => {
                            reject(err);
                        });
                } else {
                    roleId = user[0].role_id;
                }
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