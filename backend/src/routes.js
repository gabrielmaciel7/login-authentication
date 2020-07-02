const express = require("express");
const routes = express.Router();

const authController = require("./controllers/auth");

routes.get("/auth/sign-in", authController.signin);
routes.post("/auth/sign-up", authController.signup);

module.exports = routes;