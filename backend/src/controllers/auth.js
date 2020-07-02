const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Account = mongoose.model("Account");

const saltRounds = 10;

module.exports = {
  async signin(req, res) {
    return res.json("Sign in");
  },

  async signup(req, res) {
    const { email, password } = req.body;

    const account = await Account.findOne({ email });
    if (account) return res.json("Account already exists");

    const hash = bcrypt.hashSync(password, saltRounds);
    const newAccount = await Account.create({ email, password: hash });

    return res.json(newAccount);
  },
};
