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
          imgURL: "/uploads/hamburger.jpg"

        },
        {
          name: "Пицца",
          price: 700,
          discount: 20,
          courier_id: 2,
          imgURL: "/uploads/pizza.jpg"
        },
        {
          name: "Картошка фри",
          price: 200,
          discount: 30,
          courier_id: 4,
          imgURL: "/uploads/fry.jpg"
        },
        {
          name: "Салат Цезарь",
          price: 350,
          discount: 15,
          courier_id: 2,
          imgURL: "/uploads/salat.jpg"
        },
        {
          name: "Шаурма",
          price: 300,
          discount: 10,
          courier_id: 5,
          imgURL: "/uploads/shaverma.jpg"
        },
        {
          name: "Суши сет",
          price: 1200,
          discount: 25,
          courier_id: 4,
          imgURL: "/uploads/sushi.jpg"
        },
        {
          name: "Куриные крылья",
          price: 400,
          discount: 20,
          courier_id: 2,
          imgURL: "/uploads/chikens.jpg"
        },
        {
          name: "Роллы",
          price: 450,
          discount: 15,
          courier_id: 4,
          imgURL: "/uploads/roll.jpg"
        },
        {
          name: "Чизбургер",
          price: 350,
          discount: 10,
          courier_id: 2,
          imgURL: "/uploads/chis.jpg"
        },
        {
          name: "Лазанья",
          price: 650,
          discount: 15,
          courier_id: 5,
          imgURL: "/uploads/lazania.jpg"
        },
        {
          name: "Греческий салат",
          price: 400,
          discount: 5,
          courier_id: 2,
           imgURL: "/uploads/greksalat.jpg"
        },
        {
          name: "Креветки в кляре",
          price: 550,
          discount: 20,
          courier_id: 4,
           imgURL: "/uploads/shrimps.jpg"
        },
        {
          name: "Том Ям",
          price: 600,
          discount: 25,
          courier_id: 2,
           imgURL: "/uploads/tom.jpg"
        },
        {
          name: "Паста Карбонара",
          price: 500,
          discount: 10,
          courier_id: 5,
           imgURL: "/uploads/carbonara.jpg"
        },
        {
          name: "Стейк из лосося",
          price: 900,
          discount: 30,
          courier_id: 2,
           imgURL: "/uploads/fish.jpg"
        },
        {
          name: "Гамбургер",
          price: 450,
          discount: 15,
          courier_id: 5,
           imgURL: "/uploads/hamb.jpg"
        },
        {
          name: "Тирамису",
          price: 350,
          discount: 10,
          courier_id: 2,
           imgURL: "/uploads/tiramisu.jpg"
        },
        {
          name: "Рамен",
          price: 550,
          discount: 20,
          courier_id: 4,
           imgURL: "/uploads/Ramen.jpg"
        },
        {
          name: "Куриные наггетсы",
          price: 300,
          discount: 10,
          courier_id: 2,
           imgURL: "/uploads/nagets.jpg"
        },
        {
          name: "Фокачча",
          price: 250,
          discount: 5,
          courier_id: 4,
           imgURL: "/uploads/fokkacha.jpg"
        },
        {
          name: "Гуакамоле",
          price: 350,
          discount: 15,
          courier_id: 5,
           imgURL: "/uploads/molle.jpg"
        },
        {
          name: "Борщ",
          price: 400,
          discount: 10,
          courier_id: 5,
           imgURL: "/uploads/borsh.jpg"
        },
        {
          name: "Чизкейк",
          price: 450,
          discount: 20,
          courier_id: 2,
           imgURL: "/uploads/cheesecake.jpg"
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
