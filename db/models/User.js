import mongoose from "mongoose";

const { Schema } = mongoose;

import { ADMIN, USER } from "../../shared/const/user-role.js";

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

export default mongoose.model("users", userSchema);
