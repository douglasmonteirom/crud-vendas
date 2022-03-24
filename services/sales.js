const salesModel = require('../models/sales');
const productModel = require('../models/products');

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

const update = async (productId, quantity, saleId) => {
  const sale = await salesModel.getByID(saleId);
  if (!sale || sale.length === 0) { 
    return { message: 'Sale not found', code: 404 }; 
  }
  await salesModel.update(saleId, productId, quantity);

  return { data: { saleId: Number(saleId), itemUpdated: [{ productId, quantity }] }, code: 200 };
};

const soldProducts = async ({ productId, quantity }) => {
  const product = await productModel.getByID(productId);
  const updatedProduct = {
    productId,
    quantity: product.quantity - quantity,
  };
  await productModel.updateProduct(updatedProduct);
};

const returnedProducts = async ({ productId, quantity }) => {
  const product = await productModel.getByID(productId);
  const updatedProduct = {
    productId,
    quantity: product.quantity + quantity,
  };
  await productModel.updateProduct(updatedProduct);
};

const validQuantity = async (idProduct, quantityBody) => {
  const { quantity } = await productModel.getByID(idProduct);
  if (quantity - quantityBody < 0) { 
    return { message: 'Such amount is not permitted to sell', code: 422 }; 
  }
  return false;
};

const create = async (sales) => {
  const promiseValidate = sales.map((p) => validQuantity(p.productId, p.quantity));
  const resolvedPromises = await Promise.all(promiseValidate);
  const errorValid = resolvedPromises.find((error) => (error.message !== undefined));
  if (errorValid) {
    const { message, code } = errorValid;
    return { message, code };
  }
  const response = await salesModel.create(sales);

  const promisesSales = response.sales.map((s) => soldProducts(s));
  await Promise.all(promisesSales);
  return { data: { id: response.id, itemsSold: response.sales }, code: 201 };
};

const remove = async (id) => {
  const sale = await salesModel.getByID(id);
  if (!sale || sale.length === 0) { 
    return { message: 'Sale not found', code: 404 }; 
  }
  const promisesSales = sale.map((s) => returnedProducts(s));
  await Promise.all(promisesSales);
  
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
