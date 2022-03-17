const salesModel = require('../models/sales');

const getAll = async () => {
  const sales = await salesModel.getAll();
  if (!sales || sales.length === 0) return { message: 'Nenhuma venda Cadastrada', code: 404 };

  return sales;
};

const getByID = async (id) => {
  const sale = await salesModel.getByID(id);

  if (!sale || sale.length === 0) return { message: 'Sale not found', code: 404 };

  return sale;
};

const create = async (sales) => {
  const response = await salesModel.create(sales);

  return { data: { id: response.id, itemsSold: response.sales }, code: 201 };
};

const update = async (productId, quantity, saleId) => {
  const sale = await salesModel.getByID(saleId);
  if (!sale || sale.length === 0) { 
    return { message: 'Sale not found', code: 404 }; 
  }
  await salesModel.update(saleId, productId, quantity);

  return { data: { saleId: Number(saleId), itemUpdated: [{ productId, quantity }] }, code: 200 };
};

const remove = async (id) => {
  const product = await salesModel.getByID(id);
  if (!product || product.length === 0) { 
    return { message: 'Sale not found', code: 404 }; 
  }
  await salesModel.remove(id);

  return { code: 204 };
};

module.exports = {
  getAll,
  getByID,
  create,
  update,
  remove,
};
