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

const create = async (name, quantity) => {
  const [responseDB] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)', [name, quantity],
  );
  return responseDB.insertId;
};

const update = async (id, name, quantity) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name=?, quantity=? WHERE id=?', [name, quantity, id],
    );
};

module.exports = {
    getAll,
    getByID,
    create,
    update,
};