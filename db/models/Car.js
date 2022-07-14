import mongoose from "mongoose";

const { Schema } = mongoose;

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
const carSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  image: {
    type: {
      id: Number,
      filename: String,
    },
    required: true,
  },
  price: {
    type: {
      one: String,
      two: String,
      third: String,
      fourth: String,
    },
  },
});

export default mongoose.model("cars", carSchema);
