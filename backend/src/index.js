require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

const response = require("./middlewares/response");
const checkJwt = require("./middlewares/jwt");

const app = express();

app.use(cors());
app.use(response);
app.use(checkJwt);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

requireDir("./models");

app.use("/", require("./routes"));

app.listen(3001, () => {
  console.log("Starting api...");
});
