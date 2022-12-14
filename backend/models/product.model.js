const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  amount: String,
  image: String,
  price: Number,
  rating: Number,
  productType: String,
  feature: String,
  formulation: String,
  conern: String,
  catg: String,
});

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
