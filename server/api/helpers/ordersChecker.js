"use strict";

export default (db, modelName, dataObj, transaction) => {
    return new Promise(async (resolve, reject) => {

        if (modelName !== "orders") {
            return resolve(transaction);
        }
        
        const startDate = new Date (dataObj.start_date);
        const expDate = new Date (dataObj.eхpiration_date);
        const duration = (expDate - startDate)/(1000*60*60);

        return db.coverage.findAll({
            where: {id: dataObj.city_id},
            transaction: transaction
        }).then(covItems => {
            //check if there is provided agent in provided city
            if (covItems.filter((covItem) => {
                return covItem.agent_id === dataObj.agent_id;
            }).length !== 0) {
                return db.clocks.findAll({
                    where: {id: dataObj.clock_id},
                    transaction: transaction
                }).then(clock => {
                    //check if provided type of clocks exists and
                    //if provided duration of repairing equals determined time of repair
                    if (clock.length !== 0) {
                        if (clock[0].hours_of_repair === duration) {
                            //get orders which overlap provided interval for new order
                            return db.orders.findAll({
                                where: {
                                    agent_id: dataObj.agent_id,
                                    [db.Sequelize.Op.and]: [
                                        {start_date: {[db.Sequelize.Op.lte]: expDate}},
                                        {eхpiration_date: {[db.Sequelize.Op.gte]: startDate}}
                                    ]
                                },
                                transaction: transaction
                            }).then((orders) => {
                                //check if conflict orders exist
                                if (orders.length !== 0) {
                                    return reject(orders);
                                }
                                return resolve(transaction);
                            });
                        }
                    }
                    return reject();
                });
            }
            return reject();
        });

    });
};