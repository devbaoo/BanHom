'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    }
  };
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image_url: DataTypes.STRING,
    date: DataTypes.BIGINT,
    url: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    freezeTableName: true,
  });
  return Product;
};
