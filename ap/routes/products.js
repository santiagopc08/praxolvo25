const express = require("express");
const router = express.Router();
const products = [
  {
    id: 1,
    name: "ball",
    descr: "small sphere used in sports games",
    price: 15000,
    creationDate: "10/16/2024",
  },
  {
    id: 2,
    name: "frisbee",
    descr: "flying disc used for recreational activities",
    price: 15000,
    creationDate: "10/16/2024",
  },
  {
    id: 3,
    name: "bicycle",
    descr: "two-wheeled vehicle for transportation",
    price: 350000,
    creationDate: "10/16/2024",
  },
  {
    id: 4,
    name: "racket",
    descr: "tool for playing tennis",
    price: 80000,
    creationDate: "10/16/2024",
  },
  {
    id: 5,
    name: "roller skates",
    descr: "footwear with wheels for gliding",
    price: 120000,
    creationDate: "10/16/2024",
  },
];

// GET /products - Get all products
router.get("/", (req, res) => {
  if (products.length === 0) {
    return res.status(200).send("There are no products");
  }
  res.status(200).json(products);
});

// GET /products - Get products by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const foundProductById = products.find((product) => product.id === parseInt(id));
  //create a validation for id does't exist
  if (!foundProductById) {
    return res.status(404).send("Product not found");
  }
  res.status(200).json(foundProductById);
});

// POST /products - Create product
router.post("/", (req, res) => {
  const { name, descr, price } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    descr,
    price,
    creationDate: new Date(),
  };
  //create a validation for required fields
  if (!name || !descr || !price) {
    return res.status(400).send("Missing required fields");
  }
  // create a validation for price different to a number
  if (typeof price !== "number") {
    return res.status(400).send("Price must be a number");
  }
  //create a validation for price less than 0
  if (price <= 0) {
    return res.status(400).send("Price must be greater than 0");
  }

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// UPDATE /products - Update products by id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, descr, price } = req.body;
  const product = products.find((product) => product.id === parseInt(id));
  const productIndex = products.findIndex((product) => product.id === parseInt(id));
  products[productIndex] = {
    id,
    name,
    descr,
    price,
    creationDate: new Date(),
  };

  //create a validation for id does't exist
  if (!product) {
    return res.status(404).send("Product not found");
  }
  //create a validation for required fields
  if (!name &&!descr &&!price) {
    return res.status(400).send("No fields to update");
  }
  // create a validation for price different to a number
  if (typeof price !== "number") {
    return res.status(400).send("Price must be a number");
  }
  //create a validation for price less than 0
  if (price <= 0) {
    return res.status(400).send("Price must be greater than 0");
  }

  res.status(200).json(products);
});

// DELETE /products - Delete products by id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const newProductList = products.filter((product) => product.id != id);
  //create a validation for the id don't exist
  if (products.length === newProductList.length) {
    return res.status(404).send("Product not found");
  } 
  res.status(200).json(newProductList);
});

module.exports = router;
