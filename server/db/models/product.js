"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User, {
        foreignKey: "courier_id",
        as: "courier",
      });

      Product.belongsTo(models.User, {
        foreignKey: "buyer_id",
        as: "buyer",
      });

      Product.belongsToMany(models.User, {
        through: "Buskets",
        foreignKey: "product_id",
        as: "buskets",
      });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgURL: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      discount: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 99,
        },
      },
      courier_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("available", "reserved", "sold"),
        defaultValue: "available",
      },
      buyer_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
