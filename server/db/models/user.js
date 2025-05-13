"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Token, {
        foreignKey: "user_id",
        as: "tokens",
      });

      User.belongsToMany(models.Product, {
        through: "Buskets",
        foreignKey: "user_id",
        as: "basketProducts",
      });

      User.hasMany(models.Product, {
        foreignKey: "courier_id",
        as: "products",
      });

      User.hasMany(models.Product, {
        foreignKey: "buyer_id",
        as: "purchases",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("courier", "customer"),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: DataTypes.STRING,
      wallet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
