const express = require("express");
const router = express.Router();
let products = [
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
  res.status(200).json(products);
});

// GET /products - Get products by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const found = products.find((product) => product.id == id);
  res.status(200).json(found);
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
  products.push(newProduct);
  res.status(201).json(newProduct);
});
// UPDATE /products - Update products by id
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const { name, descr, price } = req.body;
  const productDate = products.find((product) => product.id == id);

  const productIndex = products.findIndex((product) => product.id == id);
  products[productIndex] = {
    id,
    name,
    descr,
    price,
    creationDate: productDate.creationDate
  };
  res.status(200).json(products);
});

// DELETE /products - Delete products by id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const remove = products.filter((product) => product.id != id);
  res.status(200).json(remove);
});

module.exports = router;
