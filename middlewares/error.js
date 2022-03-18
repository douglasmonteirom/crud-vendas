const errorMiddleware = (error, _req, res, _next) => {
    return res.status(500).json({ message: 'Algo deu errado' });
};

module.exports = {
    errorMiddleware,
};