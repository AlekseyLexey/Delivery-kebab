"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Бургер",
          price: 500,
          discount: 30,
          courier_id: 2,
        },
        {
          name: "Пицца",
          price: 700,
          discount: 20,
          courier_id: 2,
        },
        {
          name: "Картошка фри",
          price: 200,
          discount: 30,
          courier_id: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
