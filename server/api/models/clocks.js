'use strict'

module.exports = (sequelize, DataTypes) => {
    const Clocks = sequelize.define('clocks', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },
            clock_type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hours_of_repair: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: true
                }
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
    return Clocks;
};