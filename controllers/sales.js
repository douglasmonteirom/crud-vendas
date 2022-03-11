const salesModel = require('../models/sales');

const getAll = async (_req, res, next) => {
    try {
        const sales = await salesModel.getAll();
        if (!sales) return res.status(404).json({ message: 'Nenhuma venda Cadastrada' });
        return res.status(200).json(sales);
    } catch (e) {
        next(e);
    }
};

const getByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sale = await salesModel.getByID(id);
        if (!sale || sale.length === 0) { 
            return res.status(404).json({ message: 'Sale not found' }); 
        }
        return res.status(200).json(sale);
    } catch (e) {
        next(e);
    }
};
module.exports = {
    getAll,
    getByID,
};
