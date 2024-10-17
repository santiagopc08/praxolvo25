const { productsService } = require('../services');
const { response } = require('../utils');

const getProducts= async (req,res)=>{
    const products =  await productsService.getAllProducts();
    response(res,200,products);
};

const getProductById= async (req,res)=>{
    const { id } = req.params;
    const product = await productsService.getProductById(parseInt(id));
    response(res,200,product);
}

const CreateProduct= async (req,res)=>{
    const { name, descr, price } = req.body;
    const newProduct = await productsService.createProduct(name,descr,price);
    response(res,201,newProduct);
}

const UpdateProduct= async (req,res)=>{
    const { id } = req.params;
    const { name, descr, price } = req.body;
    const product = await productsService.updateProduct(parseInt(id),name,descr,price);
    response(res,200,product);
}
const DeleteProduct= async (req,res)=>{
    const { id } = req.params;
    const product = await productsService.deleteProduct(parseInt(id));
    response(res,200,product);
}



module.exports = {
    getProducts,
    getProductById,
    CreateProduct,
    UpdateProduct,
    DeleteProduct
}