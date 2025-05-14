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
        {
          name: "Салат Цезарь",
          price: 350,
          discount: 15,
          courier_id: 2,
        },
        {
          name: "Шаурма",
          price: 300,
          discount: 10,
          courier_id: 5,
        },
        {
          name: "Суши сет",
          price: 1200,
          discount: 25,
          courier_id: 4,
        },
        {
          name: "Куриные крылья",
          price: 400,
          discount: 20,
          courier_id: 2,
        },
        {
          name: "Роллы",
          price: 450,
          discount: 15,
          courier_id: 4,
        },
        {
          name: "Чизбургер",
          price: 350,
          discount: 10,
          courier_id: 2,
        },
        {
          name: "Лазанья",
          price: 650,
          discount: 15,
          courier_id: 5,
        },
        {
          name: "Греческий салат",
          price: 400,
          discount: 5,
          courier_id: 2,
        },
        {
          name: "Креветки в кляре",
          price: 550,
          discount: 20,
          courier_id: 4,
        },
        {
          name: "Том Ям",
          price: 600,
          discount: 25,
          courier_id: 2,
        },
        {
          name: "Паста Карбонара",
          price: 500,
          discount: 10,
          courier_id: 5,
        },
        {
          name: "Стейк из лосося",
          price: 900,
          discount: 30,
          courier_id: 2,
        },
        {
          name: "Гамбургер",
          price: 450,
          discount: 15,
          courier_id: 5,
        },
        {
          name: "Тирамису",
          price: 350,
          discount: 10,
          courier_id: 2,
        },
        {
          name: "Рамен",
          price: 550,
          discount: 20,
          courier_id: 4,
        },
        {
          name: "Куриные наггетсы",
          price: 300,
          discount: 10,
          courier_id: 2,
        },
        {
          name: "Фокачча",
          price: 250,
          discount: 5,
          courier_id: 4,
        },
        {
          name: "Гуакамоле",
          price: 350,
          discount: 15,
          courier_id: 5,
        },
        {
          name: "Борщ",
          price: 400,
          discount: 10,
          courier_id: 5,
        },
        {
          name: "Чизкейк",
          price: 450,
          discount: 20,
          courier_id: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
