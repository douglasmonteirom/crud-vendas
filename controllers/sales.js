const salesService = require('../services/sales');
const quantityValidate = require('../middlewares/validateQuantity');
const saleValidates = require('../middlewares/validateSale');

const getAll = async (_req, res, next) => {
  try {
    const response = await salesService.getAll();

    if (response.message) return res.status(response.code).json({ message: response.message });

    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const getByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await salesService.getByID(id);

    if (response.message) return res.status(response.code).json({ message: response.message });

    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const [{ productId, quantity }] = req.body;

    const { error } = saleValidates.validate({ productId, quantity });

    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(code).json({ message });
    }
    const responseValidate = await quantityValidate.valid(productId, quantity);
    if (responseValidate) {
      return res.status(responseValidate.code).json({ message: responseValidate.message });
    }

    const response = await salesService.create(req.body);

    if (response.message) return res.status(response.code).json({ message: response.message });

    return res.status(response.code).json(response.data);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const [{ productId, quantity }] = req.body;
    const { id } = req.params;
    const { error } = saleValidates.validate({ productId, quantity });

    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(code).json({ message });
    }

    const response = await salesService.update(productId, quantity, id);

    if (response.message) return res.status(response.code).json({ message: response.message });
    
    return res.status(response.code).json(response.data);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await salesService.remove(id);
    if (response.message) return res.status(response.code).json({ message: response.message });
    
    return res.status(response.code).json();
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
