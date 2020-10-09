'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dispatched_Products extends Model {
    static associate(models) {
      // define association here
    }
  };
  Dispatched_Products.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Dispatched_Products',
  });
  return Dispatched_Products;
};