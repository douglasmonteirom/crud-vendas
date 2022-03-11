const connection = require('./connectionDB');

const getAll = async () => {
    const [sales] = await connection.execute(
      `SELECT sale_id as saleId, date, product_id as productId, quantity 
      FROM StoreManager.sales_products sp
      JOIN StoreManager.sales s ON s.id = sp.sale_id`,
    );
    return sales;
};

const getByID = async (id) => {
    const [sale] = await connection.execute(
      `SELECT date, product_id as productId, quantity  FROM StoreManager.sales_products sp
      JOIN StoreManager.sales s ON s.id = sp.sale_id WHERE sale_id=?;`, [id],
    );
    return sale;
};

module.exports = {
    getAll,
    getByID,
};
