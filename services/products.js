const productsModel = require('../models/products');

const getAll = async () => {
  const products = await productsModel.getAll();
  if (!products || products.length === 0) { 
    return { message: 'Products not found', code: 404 }; 
  }     
  
  return { data: products, code: 200 };
};

const getByID = async (id) => {
    const product = await productsModel.getByID(id);
    if (!product || product.length === 0) { 
        return { message: 'Product not found', code: 404 }; 
    }
    return { data: product, code: 200 };
};

const create = async (name, quantity) => {
    const products = await productsModel.getAll();
    const exists = products.find((p) => p.name === name);
    
    if (exists) return { message: 'Product already exists', code: 409 };

    const responseID = await productsModel.create(name, quantity);
    return { data: { id: responseID, name, quantity }, code: 201 };
};

const update = async (name, quantity, id) => {
    const product = await productsModel.getByID(id);
    if (!product || product.length === 0) { 
        return { message: 'Product not found', code: 404 }; 
    }
    await productsModel.update(id, name, quantity);

    return { data: { id: Number(id), name, quantity }, code: 200 };
};

const remove = async (id) => {
  const product = await productsModel.getByID(id);
  if (!product || product.length === 0) { 
      return { message: 'Product not found', code: 404 }; 
  }
  await productsModel.remove(id);

  return { code: 204 };
};

module.exports = {
    getAll,
    getByID,
    create,
    update,
    remove,
};
