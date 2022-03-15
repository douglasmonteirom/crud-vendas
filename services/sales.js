const salesModel = require('../models/sales');

const getAll = async () => {
    const sales = await salesModel.getAll();
    if (!sales) return { message: 'Nenhuma venda Cadastrada', code: 404 };

    return sales;
};

const getByID = async (id) => {
    const sale = await salesModel.getByID(id);

    if (!sale || sale.length === 0) return { message: 'Sale not found', code: 404 };

    return sale;
};
module.exports = {
    getAll,
    getByID,
};
