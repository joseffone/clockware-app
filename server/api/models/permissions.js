'use strict';

export default (sequelize, DataTypes) => {
    return sequelize.define('permissions', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'roles',
                key:   'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        },
        model: {
            type: DataTypes.ENUM,
            defaultValue:'permissions',
            values: [
                'users',
                'roles',
                'permissions',
                'keys',
                'clocks',
                'cities',
                'marks',
                'agents',
                'coverage',
                'orders'
            ]
        },
        action: {
            type: DataTypes.ENUM,
            defaultValue:'read',
            values: [
                'read',
                'create',
                'update',
                'delete'
            ]
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
        timestamps: true
    });
};