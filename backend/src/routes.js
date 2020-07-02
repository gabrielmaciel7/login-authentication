const express = require("express");
const routes = express.Router();

const authController = require("./controllers/auth");
const { accountSignUp } = require("./validators/account");

routes.get("/auth/sign-in", authController.signin);
routes.post("/auth/sign-up", accountSignUp, authController.signup);

module.exports = routes;
