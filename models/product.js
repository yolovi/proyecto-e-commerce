'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category,{foreignKey:"CategoryId"});
      Product.belongsToMany(models.Order, {through:models.Order_Product})
    }
  }
  Product.init({
    name_product: DataTypes.STRING,
    price: DataTypes.FLOAT,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};

  
