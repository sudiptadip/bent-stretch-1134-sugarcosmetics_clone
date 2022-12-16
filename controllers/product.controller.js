const productModel = require("../models/product.model.js");
// const { default: productModel } = require("../models/product.model");
async function getProductsByCategory(req, res)  {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 5;
		const search = req.query.search || "";
		let sort = req.query.sort || "price";
		let cat = req.query.cat || "All";

		const catOptions = [
			"makeup",
			"lips",
			"face",
			"brushes",
			"eye",
			
		];

		cat === "All"
			? (cat = [...catOptions])
			: (cat = req.query.cat.split(","));
		req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

		let sortBy = {};
		if (sort[1]) {
			sortBy[sort[0]] = sort[1];
		} else {
			sortBy[sort[0]] = "asc";
		}

		const products = await products.find({ name: { $regex: search, $options: "i" } })
			.where("cat")
			.in([...cat])
			.sort(sortBy)
			.skip(page * limit)
			.limit(limit);

		const total = await products.countDocuments({
			cat: { $in: [...cat] },
			name: { $regex: search, $options: "i" },
		});

		const response = {
			error: false,
			total,
			page: page + 1,
			limit,
			cat: catOptions,
			products,
		};

		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
};
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

// async function getProductsByCategory(req, res) {
//   try {
//     let { cat = "", sortBy = "rating", sortOrder = "desc" } = req.query;

//     let arr = cat.split(",");
//     allTotal = [];
//     if (arr.length == 1) {
//       const products = await productModel.find();
//       return res.send({
//         status: "success",
//         data: {
//           products,
//         },
//       });
//     }
//     for (let i = 0; i < arr.length; i++) {
//       if (arr[i] !== "") {
//         const products = await productModel
//           .find({
//             catg: {
//               $regex: arr[i],
//             },
//           })
//           .sort({
//             [sortBy]: sortOrder === "asc" ? 1 : -1,
//           });
//         allTotal = [...allTotal, ...products];
//       }
//     }
//     // console.log(allTotal.length);
//     return res.send({
//       status: "success",
//       data: {
//         products: allTotal,
//       },
//     });
//   } catch (err) {
//     return res.status(500).send({
//       status: "error",
//       message: "Something went wrong",
//     });
//   }
// }
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
