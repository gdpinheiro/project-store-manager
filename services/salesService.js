const model = require('../models/salesModel');

const getAll = async () => {
  const response = await model.getAll();

  return response;
};

const getById = async (id) => {
  const response = await model.getById(id);

  return response;
};

const create = async (body) => {
  const response = await model.create(body);

  return response;
};

const update = async (id, productId, quantity) => {
  const response = await model.update(id, productId, quantity);

  return response;
};

const exclude = async (id) => {
  const response = await model.exclude(id);

  return response;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
