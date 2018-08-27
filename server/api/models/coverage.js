'use strict'

module.exports = (sequelize, DataTypes) => {
    const Coverage = sequelize.define('coverage', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },
            agent_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'agents',
                    key:   'id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            },
            city_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'cities',
                    key:   'id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
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
    return Coverage;
};