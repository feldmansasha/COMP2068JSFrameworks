const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const userSchema = {
  username: { type: String },
  password: { type: String },
  oauthID: { type: String },
  oauthProvider: { type: String },
  created: { type: Date, default: Date.now },
};

const mongooseSchema = new mongoose.Schema(userSchema);

mongooseSchema.plugin(plm);
module.exports = mongoose.model("User", mongooseSchema);
