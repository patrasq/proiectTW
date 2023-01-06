'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Inventory.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    qty: DataTypes.FLOAT,
    expiresAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Inventory',
  });
  return Inventory;
};