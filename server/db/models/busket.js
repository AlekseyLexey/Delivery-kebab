"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Busket extends Model {
    static associate(models) {
      Busket.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      Busket.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }
  Busket.init(
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      product_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Busket",
    }
  );
  return Busket;
};
