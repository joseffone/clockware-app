'use strict'

module.exports = (sequelize, DataTypes) => {
    const Marks = sequelize.define('marks', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },
            mark_name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            mark_value: {
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
    return Marks;
};