const productsService = require('../services/products');

const getAll = async (_req, res, next) => {
  try {
    const response = await productsService.getAll();

    if (response.message) return res.status(response.code).json({ message: response.message });

    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const getByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await productsService.getByID(id);

    if (response.message) return res.status(response.code).json({ message: response.message });

    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const response = await productsService.create(name, quantity);

    if (response.message) return res.status(response.code).json({ message: response.message });

    return res.status(201).json({ id: response, name, quantity });
  } catch (e) {
    next(e);
  }
};
module.exports = {
    getAll,
    getByID,
    create,
};