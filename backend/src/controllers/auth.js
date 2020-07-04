const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Account = mongoose.model("Account");

const { getMessage } = require("../helpers/validator");
const {
  generateJwt,
  generateRefreshJwt,
  getTokenFromHeaders,
  verifyRefreshJwt,
} = require("../helpers/jwt");

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
    const refreshToken = generateRefreshJwt({
      id: account.id,
      version: account.jwtVersion,
    });

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
    const refreshToken = generateRefreshJwt({
      id: newAccount.id,
      version: newAccount.jwtVersion,
    });

    return res.jsonOK(newAccount, getMessage("account.signup.success"), {
      token,
      refreshToken,
    });
  },

  async hello(req, res) {
    const { accountId } = req;

    let account = null;

    try {
      account = await Account.findOne({ _id: accountId });
    } catch (error) {
      return res.jsonNotFound();
    }

    if (!account) return res.jsonNotFound();

    return res.jsonOK(account);
  },

  async refresh(req, res) {
    const token = getTokenFromHeaders(req.headers);

    if (!token) return res.jsonUnauthorized(null, "Invalid token.");

    try {
      const decoded = verifyRefreshJwt(token);
      const account = await Account.findById(decoded.id);

      if (!account) return res.jsonUnauthorized(null, "Invalid token.");

      if (decoded.version !== account.jwtVersion)
        return res.jsonUnauthorized(null, "Invalid token.");

      const meta = {
        token: generateJwt({ id: account.id }),
      };

      return res.jsonOK(null, null, meta);
    } catch (error) {
      return res.jsonUnauthorized(null, "Invalid token.");
    }
  },
};
