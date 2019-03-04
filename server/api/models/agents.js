'use strict';

export default (sequelize, DataTypes) => {
    return sequelize.define('agents', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mark_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'marks',
                key:   'id'
            },
            onDelete: 'set null',
            onUpdate: 'cascade'
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