const productsModel = require('../models/products');

const getAll = async () => {
    const products = await productsModel.getAll();
    if (!products) return { message: 'Produtos não encontrados', code: 404 };
    
    return products;
};

const getByID = async (id) => {
    const product = await productsModel.getByID(id);
    if (!product || product.length === 0) { 
        return { message: 'Product not found', code: 404 }; 
    }
    return product;
};

const create = async (name, quantity) => {
    const products = await productsModel.getAll();
    const exists = products.find((p) => p.name === name);
    
    if (exists) return { message: 'Product already exists', code: 409 };

    const responseID = await productsModel.create(name, quantity);
    return responseID;
};

const update = async (name, quantity, id) => {
    const product = await productsModel.getByID(id);
    if (!product || product.length === 0) { 
        return { message: 'Product not found', code: 404 }; 
    }
    await productsModel.update(id, name, quantity);
    return { id: Number(id), name, quantity };
};

module.exports = {
    getAll,
    getByID,
    create,
    update,
};
