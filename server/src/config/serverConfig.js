const express = require("express");
const cookeiParser = require("cookie-parser");

const serverConfig = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookeiParser());
};

module.exports = serverConfig;
