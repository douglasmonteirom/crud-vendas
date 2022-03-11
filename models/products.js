const connection = require('./connectionDB');

const getAll = async () => {
    const [products] = await connection.execute(
        'SELECT * FROM StoreManager.products;',
    );
    return products;
};

const getByID = async (id) => {
    const [product] = await connection.execute(
        'SELECT * FROM StoreManager.products WHERE id=?;', [id],
    );
    return product[0];
};

module.exports = {
    getAll,
    getByID,
};