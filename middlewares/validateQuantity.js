const modelProduct = require('../models/products');

const valid = async (idProduct, quantityBody) => {
  const { quantity } = await modelProduct.getByID(idProduct);
  if (quantity - quantityBody < 0) { 
    return { message: 'Such amount is not permitted to sell', code: 422 }; 
  }
};

module.exports = {
  valid,
};
