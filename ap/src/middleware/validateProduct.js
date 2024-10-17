const { ClientError } = require('../utils/error');

const validateProduct = (req, res, next) => {
    const { name, descr, price } = req.body;
    let errors = [];

    if (!name || typeof name !== 'string' || name.trim() === '') {
        errors.push('Invalid product name');
    }

    if (!descr || typeof descr !== 'string' || descr.trim() === '') {
        errors.push('Invalid product description');
    }

    if (typeof price !== 'number' || price <= 0) {
        errors.push('Invalid product price');
    }

    if (errors.length > 0) {
        return next(new ClientError(errors.join(', '), 400));
    }

    next();
};

module.exports = validateProduct;
