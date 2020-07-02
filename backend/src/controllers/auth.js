const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Account = mongoose.model("Account");
const { getMessage } = require("../helpers/validator");

const saltRounds = 10;

module.exports = {
  async signin(req, res) {
    return res.jsonOK(null);
  },

  async signup(req, res) {
    const { email, password } = req.body;

    const account = await Account.findOne({ email });
    if (account)
      return res.jsonBadRequest(
        null,
        getMessage("account.signup.email_exists")
      );

    const hash = bcrypt.hashSync(password, saltRounds);
    const newAccount = await Account.create({ email, password: hash });

    return res.jsonOK(newAccount, getMessage("account.signup.success"));
  },
};
