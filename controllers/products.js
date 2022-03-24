const productsService = require('../services/products');
const productValidates = require('../middlewares/validateProduct');

const getAll = async (_req, res, next) => {
  try {
    const response = await productsService.getAll();

    if (response.message) return res.status(response.code).json({ message: response.message });

    return res.status(response.code).json(response.data);
  } catch (e) {
    next(e);
  }
};

const getByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await productsService.getByID(id);

    if (response.message) return res.status(response.code).json({ message: response.message });

    return res.status(response.code).json(response.data);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { error } = productValidates.validate(req.body);

    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(code).json({ message });
    }
    // validação com joi usada na monitoria, código do Gaspar.
    const { name, quantity } = req.body;
    const response = await productsService.create(name, quantity);

    if (response.message) return res.status(response.code).json({ message: response.message });

    return res.status(response.code).json(response.data);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { error } = productValidates.validate(req.body);

    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(code).json({ message });
    }

    const { name, quantity } = req.body;
    const { id } = req.params;
    const response = await productsService.update(name, quantity, id);

    if (response.message) return res.status(response.code).json({ message: response.message });
    
    return res.status(response.code).json(response.data);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await productsService.remove(id);
    if (response.message) return res.status(response.code).json({ message: response.message });
    
    return res.status(response.code).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
    getAll,
    getByID,
    create,
    update,
    remove,
};