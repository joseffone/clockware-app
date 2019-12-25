'use strict';

export default (db, modelName, dataObj, transaction, flag) => {
    return new Promise((resolve, reject) => {

        if (modelName !== 'orders') {
            return resolve(transaction);
        }

        let orderId = [];
        const startDate = new Date (dataObj.start_date);
        const expDate = new Date (dataObj.expiration_date);
        const duration = (expDate - startDate)/(1000*60*60);

        //if flag = true then it's update transaction
        //so updated entry has to be excluded from checking
        //if flag = false then it's create transaction and empty array is passed
        //which means there is no need to exclude any entry from checking procedure
        if (flag) {
            orderId = [dataObj.id];
        }

        return db.coverage.findAll({
            where: {city_id: dataObj.city_id},
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
                                    id: {[db.Sequelize.Op.notIn]: orderId},
                                    agent_id: dataObj.agent_id,
                                    [db.Sequelize.Op.and]: [
                                        {start_date: {[db.Sequelize.Op.lt]: expDate}},
                                        {expiration_date: {[db.Sequelize.Op.gt]: startDate}}
                                    ]
                                },
                                transaction: transaction
                            }).then((orders) => {
                                //check if conflict orders exist
                                if (orders.length !== 0) {
                                    return reject({errMessage: 'Order creating terminated. Chosen agent is already reserved for provided time interval'});
                                }
                                return resolve(transaction);
                            });
                        }
                    }
                    return reject({errMessage: 'Time interval does not match to provided clock type'});
                });
            }
            return reject({errMessage: 'Chosen agent is not available in provided city'});
        });

    });
};