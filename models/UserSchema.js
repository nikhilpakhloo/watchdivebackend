import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid Email",
      },
    },
    phone: {
      type: Number,
      unique: true,
      required: true,
    },
    refferalcode: {
      type: String,
      unique: true,
    },
    totalpoints:{
      type:Number,
      default:null
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;