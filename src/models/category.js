'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Category, { foreignKey: 'parentId', as: 'subcategories' });
      Category.belongsTo(models.Category, { foreignKey: 'parentId', as: 'parent' });
      Category.hasMany(models.Product, { foreignKey: 'categoryId', as: 'products' });
    }
  };
  Category.init({
    name: DataTypes.STRING,
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories', // hoặc 'Categories' tuỳ vào thiết lập tên bảng của bạn
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    freezeTableName: true,
  });
  return Category;
};
