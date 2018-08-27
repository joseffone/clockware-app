'use strict'

module.exports = (sequelize, DataTypes) => {
    const Cities = sequelize.define('cities', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },
            city_name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            }
        },
        {
            underscored: true,
            freezeTableName: true,
            timestamps: true,
            paranoid: true
        }
    );
    return Cities;
};