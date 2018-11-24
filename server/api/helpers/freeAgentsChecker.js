"use strict";

export default (db, dataObj) => {
    return new Promise((resolve, reject) => {
        //check if there are orders which are overlapped by provided time interval
        db.orders.findAll({
            where: {
                [db.Sequelize.Op.and]: [
                    {start_date: {[db.Sequelize.Op.lte]: dataObj.eхpiration_date}},
                    {eхpiration_date: {[db.Sequelize.Op.gte]: dataObj.start_date}}
                ]
            },
            group: ["agent_id"]
        }).then((orders) => {
            if (orders.length !== 0) {
                //overlapped orders exist so get and return an array with corresponding agents ids
                return orders.map((order) => {
                    return order.agent_id;
                });
            }
            //return an empty array if there are no orders found
            return orders;
        }).then((bookedAgentsIds) => {
            //find enties containing agents ids which are matched with provided city id
            //and exclude those which contain booked agents ids
            return db.coverage.findAll({
                where: {
                    city_id: dataObj.city_id,
                    agent_id: {[db.Sequelize.Op.notIn]: bookedAgentsIds}
                }
            }).then((covItems) => {
                if (covItems.length !== 0) {
                    const freeAgentsIds = covItems.map((covItem) => {
                        return covItem.agent_id;
                    });
                    //pass an array containing free agents ids
                    return resolve(freeAgentsIds);
                }
                //free agents are not found so call reject
                reject();
            }).catch((err) => {
                reject(err);
            });
        }).catch((err) => {
            reject(err);
        });
    });
};