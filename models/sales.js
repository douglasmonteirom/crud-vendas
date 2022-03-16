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

const addSale = async (saleId, productId, quantity) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
};

const create = async (sales) => {
  const [responseDB] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?)', [new Date()],
  );
  sales.map((s) => addSale(responseDB.insertId, s.productId, s.quantity));

  return { id: responseDB.insertId, sales };
};

const update = async (saleId, productId, quantity) => {
  await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity=? WHERE sale_id=? AND product_id=?',
    [quantity, saleId, productId],
    );
};

module.exports = {
  getAll,
  getByID,
  create,
  update,
};
