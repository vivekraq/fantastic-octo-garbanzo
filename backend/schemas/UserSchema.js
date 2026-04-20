const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    // Additional fields can be added here
  },
  {
    timestamps: true,
  }
);

// Plugin for passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

module.exports = userSchema;
