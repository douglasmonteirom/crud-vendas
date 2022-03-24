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
  const response = connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return response;
};

const create = async (sales) => {
  const [responseDB] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?)', [new Date()],
  );
  const promiseSales = sales.map((s) => addSale(responseDB.insertId, s.productId, s.quantity));
  await Promise.all(promiseSales);

  return { id: responseDB.insertId, sales };
};

const update = async (saleId, productId, quantity) => {
  await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity=? WHERE sale_id=? AND product_id=?',
    [quantity, saleId, productId],
    );
};

const remove = async (id) => {
  await connection.execute('DELETE FROM StoreManager.sales WHERE id=?', [id]);
};

module.exports = {
  getAll,
  getByID,
  create,
  update,
  remove,
};
