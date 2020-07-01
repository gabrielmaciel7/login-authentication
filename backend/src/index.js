const express = require("express");
const mongoose = require("mongoose");

const authController = require("./controllers/auth");

const app = express();

mongoose.connect("mongodb://localhost:27017/login", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/auth", authController);

app.get("/", (req, res) => {
  return res.json("Api running...");
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
