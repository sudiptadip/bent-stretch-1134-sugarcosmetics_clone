const productModel = require("../models/product.model.js");
// const { default: productModel } = require("../models/product.model");

async function getProductsById(req, res) {
  const { pId } = req.params;

  const product = await productModel.find({
    _id: pId,
  });

  return res.send({
    status: "success",
    data: product,
  });
}

async function getProductsPaginated(req, res) {
  try {
    let {
      search = "",
      cat = "",
      pageSize = 10,
      page = 1,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const totalProducts = await productModel
      .find({
        name: {
          $regex: search,
        },
      })
      .count();
    // console.log(cat, search);
    // cat = cat.toLowerCase();
    const products = await productModel
      .find({
        name: {
          $regex: search,
        },
      })
      .sort({
        [sortBy]: sortOrder === "asc" ? 1 : -1,
      })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    return res.send({
      status: "success",
      data: {
        totalProducts,
        products,
        page,
        pageSize,
      },
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
}

async function getProductsByCategory(req, res) {
  try {
    let { cat = "", sortBy = "createdAt", sortOrder = "desc" } = req.query;

    let arr = cat.split(",");
    allTotal = [];
    if (arr.length == 1) {
      const products = await productModel.find();
      return res.send({
        status: "success",
        data: {
          products,
        },
      });
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== "") {
        const products = await productModel
          .find({
            catg: {
              $regex: arr[i],
            },
          })
          .sort({
            [sortBy]: sortOrder === "asc" ? 1 : -1,
          });
        allTotal = [...allTotal, ...products];
      }
    }
    // console.log(allTotal.length);
    return res.send({
      status: "success",
      data: {
        products: allTotal,
      },
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
}
async function createProduct(req, res) {
  const product = req.body;
  const blogData = await productModel.create(product);
  return res.send({
    status: "success",
    data: blogData,
  });
}

async function getProductById(req, res) {
  const { id } = req.params;

  const blog = await productModel.findById(id);

  return res.send({
    status: "success",
    data: blog,
  });
}

module.exports = {
  getProductById,
  createProduct,
  getProductsPaginated,
  getProductsById,
  getProductsByCategory,
};
