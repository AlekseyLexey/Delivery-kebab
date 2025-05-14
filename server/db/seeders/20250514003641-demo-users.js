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
          city: "Khv",
          role: "customer",
        },
        {
          username: "Kirill",
          email: "kirill@test.com",
          password: hashedPassword,
          city: "Khv",
          role: "courier",
        },
        {
          username: "Nick",
          email: "nick@test.com",
          password: hashedPassword,
          city: "Ekb",
          role: "customer",
        },
        {
          username: "Dima",
          email: "dima@test.com",
          password: hashedPassword,
          city: "Ekb",
          role: "courier",
        },
        {
          username: "Egor",
          email: "egor@test.com",
          password: hashedPassword,
          city: "Khv",
          role: "courier",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
