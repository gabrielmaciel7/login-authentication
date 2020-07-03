const express = require("express");
const routes = express.Router();

const authController = require("./controllers/auth");
const { accountSignUp, accountSignIn } = require("./validators/account");

routes.post("/auth/sign-in", accountSignIn, authController.signin);
routes.post("/auth/sign-up", accountSignUp, authController.signup);

module.exports = routes;
