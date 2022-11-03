const express = require('express');
const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');
const service = require('../services/productsService');

const router = express.Router();

// Validação com o Joi retirada de https://github.com/tryber/sd-015-a-live-lectures/blob/monitoria/23.5/schemas/cupCreate.js

const schema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'any.required': '400|"name" is required',
    'string.base': '422|"name" must be a string',
    'string.min': '422|"name" length must be at least 5 characters long',
  }),
  quantity: Joi.number().integer().min(1).required()
.messages({
    'any.required': '400|"quantity" is required',
    'number.integer': '422|"quantity" must be an integer',
    'number.min': '422|"quantity" must be greater than or equal to 1',
  }),
});

const validateBody = (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      const [code, message] = error.details[0].message.split('|');
      return res.status(code).json({ message });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const validateExistenceByName = async (req, res, next) => {
  try {
    const { name } = req.body;

    const product = await service.validateExistenceByName(name);

    if (product) {
      return res.status(StatusCodes.CONFLICT).json({
        message: 'Product already exists',
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const validateExistenceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.validateExistenceById(id);

    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Product not found',
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

router.get(
  '/',
  rescue(async (_req, res, next) => {
    try {
      const products = await service.getAll();

      res.status(StatusCodes.OK).json(products);
    } catch (error) {
      next(error);
    }
  }),
);

router.get(
  '/:id',
  rescue(async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await service.getById(id);

      if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Product not found',
        });
      }

      res.status(StatusCodes.OK).json(product);
    } catch (error) {
      next(error);
    }
  }),
);

router.post(
  '/',
  validateBody,
  validateExistenceByName,
  rescue(async (req, res, next) => {
    try {
      const { name, quantity } = req.body;
      const product = await service.create(name, quantity);

      res.status(StatusCodes.CREATED).json(product);
    } catch (error) {
      next(error);
    }
  }),
);

router.put(
  '/:id',
  validateBody,
  validateExistenceById,
  rescue(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, quantity } = req.body;

      const product = await service.update(id, name, quantity);

      res.status(StatusCodes.OK).json(product);
    } catch (error) {
      next(error);
    }
  }),
);

router.delete(
  '/:id',
  validateExistenceById,
  rescue(async (req, res, next) => {
    try {
      const { id } = req.params;

      await service.exclude(id);

      res.status(StatusCodes.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  }),
);

module.exports = router;
