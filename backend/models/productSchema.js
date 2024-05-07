const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference to the User model
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productValue: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Stocks", productSchema);

module.exports = Product;
