const mongoose = require("mongoose");
const validatePackage = require("validator");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxlength: 20,
    },
    lastName: {
      type: String,
      trim: true,
      minLength: 4,
      maxlength: 20,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validatePackage.isEmail(value)) {
          throw new Error("not a valid EmailId: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxlength: 20,
      validate(value) {
        if (!validatePackage.isStrongPassword(value)) {
          throw new Error("your password is weak: " + value);
        }
      },
    },
    age: {
      type: Number,
      trim: true,
      min: 18,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      //custom validation not effecting patch method update in the patch api call
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("not a valid gender");
        }
      },
    },
    about: {
      type: String,
      default: "simply cool",
      trim: true,
      minLength: 4,
      maxlength: 50,
    },
    photoUrl: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg",
      trim: true,
      maxlength: 100,
      validate(value) {
        if (!validatePackage.isURL(value)) {
          throw new Error("invalid Photo url: " + value);
        }
      },
    },
    skills: {
      type: [String],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
