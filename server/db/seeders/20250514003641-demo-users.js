"use strict";
const bcrypt = require("bcrypt");

const getHashPassword = async (password) => await bcrypt.hash(password, 3);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await getHashPassword("1234");

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Alex",
          email: "alex@test.com",
          password: hashedPassword,
          city: "Хабаровск",
          role: "customer",
          wallet: 100000,
        },
        {
          username: "Kirill",
          email: "kirill@test.com",
          password: hashedPassword,
          city: "Хабаровск",
          role: "courier",
          wallet: 0,
        },
        {
          username: "Nick",
          email: "nick@test.com",
          password: hashedPassword,
          city: "Владивосток",
          role: "customer",
          wallet: 0,
        },
        {
          username: "Dima",
          email: "dima@test.com",
          password: hashedPassword,
          city: "Владивосток",
          role: "courier",
          wallet: 0,
        },
        {
          username: "Egor",
          email: "egor@test.com",
          password: hashedPassword,
          city: "Хабаровск",
          role: "courier",
          wallet: 0,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
