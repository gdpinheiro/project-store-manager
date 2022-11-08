const model = require('../models/productsModel');

const getAll = async () => {
  const response = await model.getAll();
  console.log(response);
  return response;
};

const getById = async (id) => {
  const response = await model.getById(id);
  console.log(response);
  return response;
};

const validateExistenceByName = async (name) => {
  const response = await model.validateExistenceByName(name);
  console.log(response);
  return response;
};

const validateExistenceById = async (id) => {
  const response = await model.validateExistenceById(id);
  console.log(response);
  return response;
};

const create = async (name, quantity) => {
  const response = await model.create(name, quantity);
  console.log(response);
  return response;
};

const update = async (id, name, quantity) => {
  const response = await model.update(id, name, quantity);
  console.log(response);
  return response;
};

const exclude = async (id) => {
  const response = await model.exclude(id);
  console.log(response);
  return response;
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
