const salesService = require('../services/sales');

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
module.exports = {
    getAll,
    getByID,
};
