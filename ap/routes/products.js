const express = require('express');
const router = express.Router();
const Product = require('../models/product');
let products = [];

// Validations
function validateProduct(product) {
    const errors = [];
    if (!product.name || typeof product.name !== 'string' || product.name.trim() === '') {
        errors.push('Nombre de producto inválido');
    }
    if (!product.descr || typeof product.descr !== 'string') {
        errors.push('Descripción de producto inválida');
    }
    if (!product.price || typeof product.price !== 'number' || product.price <= 0) {
        errors.push('Precio de producto inválido');
    }
    return errors;
}

// GET /products - Get all products
router.get('/', (req, res) => {
    res.status(200).json(products);
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
        const { name, descr, price } = req.body;
        const errors = validateProduct({ name, descr, price });
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        const id = Date.now().toString();
        const creationDate = new Date();
        const newProduct = new Product(id, name, descr, price, creationDate);
        products.push(newProduct);
        res.status(201).json(newProduct);
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