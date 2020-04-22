const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
  
});

const User = model("user", userSchema);

module.exports = User;
