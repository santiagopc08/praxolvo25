const express = require('express');
const router = express.Router();
let products = [];

// GET /products - Get all products
router.get('/', (req, res) => {
    res.status(200).json(products);
});

// POST /products - Create product
router.post('/', (req, res) => {
    const { name, descr, price } = req.body;
    const newProduct = {
        id: products.length + 1,
        name,
        descr,
        price,
        creationDate: new Date()
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// GET /products - Get one product
router.get('/:id', (req, res, next) => {
    try {
        const product = products.find(p => p.id === req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        next(error);
    }
});

// PUT /products - Update product
router.put('/:id', (req, res, next) => {
    try {
        const index = products.findIndex(p => p.id === req.params.id);
        if (index === -1) return res.status(404).json({ message: 'Product not found' });
        const { name, descr, price } = req.body;
        products[index] = { ...products[index], name, descr, price };
        res.json(products[index]);
    } catch (error) {
        next(error);
    }
});

// DELETE /products - Delete product
router.delete('/:id', (req, res, next) => {
    try {
        const index = products.findIndex(p => p.id === req.params.id);
        if (index === -1) return res.status(404).json({ message: 'Product not found' });
        const deletedProduct = products.splice(index, 1);
        res.json({ message: 'Removed product', product: deletedProduct[0] });
    } catch (error) {
        next(error);
    }
});

module.exports = router;