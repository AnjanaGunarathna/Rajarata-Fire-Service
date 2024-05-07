const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  company: {
    type: String,
    required: true,
  },

  mobile: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  add: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

const users = new mongoose.model("Supplier",userSchema);


module.exports = users;
