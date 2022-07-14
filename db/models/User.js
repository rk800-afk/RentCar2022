const mongoose = require("mongoose");

const { Schema } = mongoose;

const { ADMIN, USER } = require("../../shared/const/user-role");

/*
  Model 'User'
  2 properties

  email - String
  password - String
  role - String
    + available values:
      "admin",
      "user"
*/
const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  role: {
    type: String,
    enum: [ADMIN, USER],
    required: true
  },
  password: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model("users", userSchema);
