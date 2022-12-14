const express = require("express");

const {
  getProductById,
  createProduct,
  getProductsPaginated,
  getProductsByCategory,
} = require("../controllers/product.controller.js");

const productRouter = express.Router();

productRouter.get("/cat", getProductsByCategory);
productRouter.post("/create", createProduct);

productRouter.get("/:Id", getProductById);

productRouter.get("/", getProductsPaginated);

module.exports = productRouter;
