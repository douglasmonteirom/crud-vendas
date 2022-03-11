const productsModel = require('../models/products');

const getAll = async (req, res, next) => {
    try {
        const products = await productsModel.getAll();
        if (!products) return res.status(404).json({ message: 'Produtos não encontrados' });
        return res.status(200).json(products);
    } catch (e) {
        next(e);
    }
};

const getByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productsModel.getByID(id);
        if (!product || product.length === 0) { 
            return res.status(404).json({ message: 'Product not found' }); 
        }
        return res.status(200).json(product);
    } catch (e) {
        next(e);
    }
};
module.exports = {
    getAll,
    getByID,
};