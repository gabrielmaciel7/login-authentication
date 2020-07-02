const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

AccountSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    delete ret["password"];
    return ret;
  },
});

mongoose.model("Account", AccountSchema);
