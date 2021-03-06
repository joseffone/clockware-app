'use strict';

export default (sequelize, DataTypes) => {
    return sequelize.define('keys', {
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
            unique: true,
            references: {
                model: 'users',
                key:   'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        },
        refresh_token: {
            type: DataTypes.STRING(3000),
            allowNull: false
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