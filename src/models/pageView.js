'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PageView extends Model {
        static associate(models) {
            // define association here
        }
    }

    PageView.init({
        page: {
            type: DataTypes.STRING,
            allowNull: false
        },
        accessTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        ipAddress: {
            type: DataTypes.STRING
        },
        deviceType: {
            type: DataTypes.STRING
        },
        browser: {
            type: DataTypes.STRING
        },
        referrer: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'PageView',
        tableName: 'pageViews'
    });

    return PageView;
};