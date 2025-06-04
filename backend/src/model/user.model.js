import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    avatar: {
      type: String, //cloudinary url
      default: "",
    },
    mobile: {
      type: String,
      default: "",
    },
    lastLoginDate: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model("User", userSchema);
