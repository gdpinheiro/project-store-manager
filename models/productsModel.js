const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.execute(query, [id]);
  return product[0];
};

const validateExistenceByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?';
  const [product] = await connection.execute(query, [name]);
  return product[0];
};

const validateExistenceById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.execute(query, [id]);
  if (!product[0]) return false;
  return true;
};

const create = async (name, quantity) => {
  const query = `INSERT INTO StoreManager.products (name, quantity)
    VALUES (?, ?)`;
  const [product] = await connection.execute(query, [name, quantity]);

  return {
    id: product.insertId,
    name,
    quantity,
  };
};

const update = async (id, name, quantity) => {
  const query = `UPDATE StoreManager.products SET name = ?, quantity = ? 
    WHERE id = ?`;
  await connection.execute(query, [name, quantity, id]);
  return { id, name, quantity };
};

const exclude = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.execute(query, [id]);
  return product;
};

module.exports = {
  getAll,
  getById,
  validateExistenceByName,
  validateExistenceById,
  create,
  update,
  exclude,
};
