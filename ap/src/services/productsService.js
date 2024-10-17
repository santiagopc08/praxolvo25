const { ClientError } = require("../utils/error");
let products = [];
products.push({
    id: 1,
    name: 'Laptop',
    descr: 'Laptop Lenovo',
    price: 500,
    creationDate: new Date()
});
products.push({
    id: 2,
    name: 'Mouse',
    descr: 'Mouse Logitech',
    price: 20,
    creationDate: new Date()
});
products.push({
    id: 3,
    name: 'Keyboard',
    descr: 'Keyboard Genius',
    price: 30,
    creationDate: new Date()
});

const getAllProducts = async () => {
    if(products.length === 0){
        throw new ClientError('No products found', 404);
    }
    return products;
}
const getProductById = async (id) => {
    const product= products.find(product => product.id === id);
    if(!product){
        throw new ClientError('Id invalid', 400);
    }
    return product;
}

const createProduct = async (name, descr, price) => {
    if (!name || !descr || price === undefined || price <= 0) {
        throw new ClientError('Invalid product data', 400);
    }
    const newProduct = {
        id: products.length + 1,
        name,
        descr,
        price,
        creationDate: new Date()
    }
    products.push(newProduct);
    return newProduct;

}

const updateProduct = async (id, name, descr, price) => {
    const product = products.find(product => product.id === id);
    if (!product) {
        throw new ClientError(`Product with ID ${id} not found`, 404);
    }
    if (!name || !descr || price === undefined || price <= 0) {
        throw new ClientError('Invalid product data for update', 400);
    }
    product.name = name;
    product.descr = descr;
    product.price = price;
    return product;
}

const deleteProduct = async (id) => {
    const product = products.find(product => product.id === id);
    if (!product) {
        throw new ClientError(`Product with ID ${id} not found`, 404);
    }
    products = products.filter(product => product.id !== id);
    return product;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}