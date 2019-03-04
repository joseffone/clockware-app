'use strict';

export default (sequelize, DataTypes) => {
    return sequelize.define('orders', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key:   'id'
            },
            onDelete: 'no action',
            onUpdate: 'cascade'
        },
        clock_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'clocks',
                key:   'id'
            },
            onDelete: 'no action',
            onUpdate: 'cascade'
        },
        city_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cities',
                key:   'id'
            },
            onDelete: 'no action',
            onUpdate: 'cascade'
        },
        agent_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        eхpiration_date: {
            type: DataTypes.DATE,
            allowNull: false
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
    }, {
        underscored: true,
        freezeTableName: true,
        timestamps: true,
        paranoid: true
    });
};