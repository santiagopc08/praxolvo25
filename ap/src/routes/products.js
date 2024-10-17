const express = require('express');
const router = express.Router();
const { productsController } = require('../controllers');
const {validateProduct} = require('../middleware');


router.get('/',productsController.getProducts);
router.post('/',validateProduct,productsController.CreateProduct);
router.get('/:id',productsController.getProductById);
router.put('/:id',validateProduct,productsController.UpdateProduct);
router.delete('/:id',productsController.DeleteProduct);

module.exports = router;