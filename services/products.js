const modelProducts = require('../models/products');

// const productExists = async (name) => {
//     const [products] = await modelProducts.getAll();
//     const exists = products.find((p) => p.name === name);
//     if (exists) return { message: 'Product already exists', code: 409 };

//     return products;
// };

const create = async (name, quantity) => {
    const products = await modelProducts.getAll();
    console.log(products);
    const exists = products.find((p) => p.name === name);
    if (exists) return { message: 'Product already exists', code: 409 };

    const responseID = await modelProducts.create(name, quantity);
    return responseID;
};

module.exports = {
    // productExists,
    create,
};
