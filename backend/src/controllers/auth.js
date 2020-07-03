const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Account = mongoose.model("Account");

const { getMessage } = require("../helpers/validator");
const { generateJwt, generateRefreshJwt } = require("../helpers/jwt");

const saltRounds = 10;

module.exports = {
  async signin(req, res) {
    const { email, password } = req.body;

    const account = await Account.findOne({ email });

    //password validation
    const match = account
      ? bcrypt.compareSync(password, account.password)
      : null;

    if (!match)
      return res.jsonBadRequest(null, getMessage("account.signin.invalid"));

    const token = generateJwt({ id: account.id });
    const refreshToken = generateRefreshJwt({ id: account.id });

    return res.jsonOK(account, getMessage("account.signin.success"), {
      token,
      refreshToken,
    });
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

    const token = generateJwt({ id: newAccount.id });
    const refreshToken = generateRefreshJwt({ id: newAccount.id });

    return res.jsonOK(newAccount, getMessage("account.signup.success"), {
      token,
      refreshToken,
    });
  },
};
