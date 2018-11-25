"use strict";

import "dotenv/config";
import bcrypt from "bcrypt";

export default (db, dataObj) => {
    return new Promise(async (resolve, reject) => {

        let rolesIds = {};

        console.log("Default roles creating...")

        for (const role of dataObj.defaultRoles) {
            await db["roles"].findOrCreate({where: {role: role}})
                .then((role) => {
                    console.log("[" + role[0].role + "] role created");
                    rolesIds[role[0].role] = role[0].id;
                })
                .catch((err) => {
                    reject(err);
                });
        }

        console.log("Default permissions setting...")
        for (const modelKey in dataObj.defaultPermissions) {
            for (const roleKey in dataObj.defaultPermissions[modelKey]) {
                for (const action of dataObj.defaultPermissions[modelKey][roleKey]) {
                    await db["permissions"].findOrCreate({
                        where: {
                            role_id: rolesIds[roleKey],
                            model: modelKey,
                            action: action
                        }})
                        .then((permission) => {
                            console.log("Permission ID: " + permission[0].id + ", role: " + roleKey + ", model: " + modelKey + ", action: " + action + ";");
                        })
                        .catch((err) => {
                            reject(err);
                        });
                }
            }
        }

        console.log("Default admin user creating...")
        bcrypt.hash(dataObj.defaultAdmin.password, +process.env.BCRYPT_SALT_ROUNDS, async (err, hash) => {
            
            if(err) {
                return reject(err);
            }
            
            await db["users"].findOrCreate({
                where: {
                    email: dataObj.defaultAdmin.email
                },
                defaults:{
                    first_name: dataObj.defaultAdmin.first_name,
                    last_name: dataObj.defaultAdmin.last_name,
                    password: hash
                }})
                .then((user) => {
                    console.log("User " + user[0].email + " with admin status created");
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });

    });
};