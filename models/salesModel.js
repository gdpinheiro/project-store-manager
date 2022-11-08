const connection = require('./connection');

const serializeAll = (sale) =>
  sale.map((item) => ({
    saleId: item.sale_id,
    productId: item.product_id,
    quantity: item.quantity,
    date: item.date,
  }));

const serializeById = (sale) =>
  sale.map((item) => ({
    productId: item.product_id,
    quantity: item.quantity,
    date: item.date,
  }));

const getAll = async () => {
  const query = `SELECT sp.sale_id, sp.product_id, sp.quantity, sl.date 
    FROM StoreManager.sales AS sl 
    JOIN StoreManager.sales_products AS sp
    ON sp.sale_id = sl.id `;
  const [sales] = await connection.execute(query);
  return serializeAll(sales);
};

const getById = async (id) => {
  const query = `SELECT sp.sale_id, sp.product_id, sp.quantity, sl.date 
    FROM StoreManager.sales AS sl 
    JOIN StoreManager.sales_products AS sp
    ON sp.sale_id = sl.id 
    WHERE id = ? ORDER BY sale_id AND product_id`;
  const [sale] = await connection.execute(query, [id]);
  return serializeById(sale);
};

const create = async (body) => {
  const saleQuery = 'INSERT INTO StoreManager.sales () VALUES ()';
  const [sale] = await connection.execute(saleQuery);

  body.map(async (item) => {
    const bodyQuery = `INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) 
      VALUES (?, ?, ?)`;
    await connection.execute(bodyQuery, [
      sale.insertId,
      item.productId,
      item.quantity,
    ]);
    return item;
  });

  return {
    id: sale.insertId,
    itemsSold: body,
  };
};

const update = async (id, productId, quantity) => {
  const query = `UPDATE StoreManager.sales_products SET product_id = ?, quantity = ? 
    WHERE product_id = ?`;
  await connection.execute(query, [productId, quantity, productId]);

  return {
    saleId: id,
    itemUpdated: [
      {
        productId,
        quantity,
      },
    ],
  };
};

const exclude = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
  const [sale] = await connection.execute(query, [id]);
  return sale;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
