'use strict';
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('tasks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            content: {
                type: DataTypes.STRING
            },
            completed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        });
    },
    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable('tasks');
    }
};