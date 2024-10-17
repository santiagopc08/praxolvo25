const express = require('express');
const router = express.Router();
const { productsController } = require('../controllers');

router.get('/',productsController.getProducts);
router.post('/',productsController.CreateProduct);
router.get('/:id',productsController.getProductById);
router.put('/:id',productsController.UpdateProduct);
router.delete('/:id',productsController.DeleteProduct);

module.exports = router;