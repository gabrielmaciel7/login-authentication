const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/login", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

requireDir("./models");

app.use("/", require("./routes"));

app.listen(3001, () => {
  console.log("Starting api...");
});
