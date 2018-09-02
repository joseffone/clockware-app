'use strict'

module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define('orders', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },
            client_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'clients',
                    key:   'id'
                },
                onDelete: 'no action',
                onUpdate: 'cascade'
            },
            clock_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'clocks',
                    key:   'id'
                },
                onDelete: 'no action',
                onUpdate: 'cascade'
            },
            city_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'cities',
                    key:   'id'
                },
                onDelete: 'no action',
                onUpdate: 'cascade'
            },
            agent_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'agents',
                    key:   'id'
                },
                onDelete: 'no action',
                onUpdate: 'cascade'
            },
            start_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            end_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM,
                default:'in progress',
                values: ['in progress', 'completed']
            },
            note: {
                type: DataTypes.TEXT
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        },
        {
            underscored: true,
            freezeTableName: true,
            timestamps: true,
            paranoid: true
        }
    );
    return Orders;
};