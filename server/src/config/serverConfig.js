const express = require("express");
const cookeiParser = require("cookie-parser");
const path = require("path");

const serverConfig = (app) => {
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "..", "..", "uploads"))
  );
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookeiParser());
};

module.exports = serverConfig;
