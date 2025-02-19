'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('pageViews', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            page: {
                type: Sequelize.STRING,
                allowNull: false
            },
            accessTime: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            ipAddress: {
                type: Sequelize.STRING,
                allowNull: true
            },
            deviceType: {
                type: Sequelize.STRING,
                allowNull: true
            },
            browser: {
                type: Sequelize.STRING,
                allowNull: true
            },
            referrer: {
                type: Sequelize.STRING,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('pageViews');
    }
};