const express = require('express');
const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');
const service = require('../services/salesService');

const router = express.Router();

// Validação com o Joi retirada de https://github.com/tryber/sd-015-a-live-lectures/blob/monitoria/23.5/schemas/cupCreate.js

const schema = Joi.object({
  productId: Joi.required().messages({
    'any.required': '400|"productId" is required',
  }),
  quantity: Joi.number().min(1).required().messages({
    'any.required': '400|"quantity" is required',
    'number.min': '422|"quantity" must be greater than or equal to 1',
  }),
});

const validateBody = (req, res, next) => {
  try {
    const { error } = schema.validate(req.body[0]);

    if (error) {
      const [code, message] = error.details[0].message.split('|');
      return res.status(code).json({ message });
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
      const sale = await service.getAll();

      res.status(StatusCodes.OK).json(sale);
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

      const sale = await service.getById(id);

      if (!sale || sale.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Sale not found',
        });
      }

      res.status(StatusCodes.OK).json(sale);
    } catch (error) {
      next(error);
    }
  }),
);

router.post(
  '/',
  validateBody,
  rescue(async (req, res, next) => {
    try {
      const sale = await service.create(req.body);

      res.status(StatusCodes.CREATED).json(sale);
    } catch (error) {
      next(error);
    }
  }),
);

router.put(
  '/:id',
  validateBody,
  rescue(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { productId, quantity } = req.body[0];
      const sale = await service.update(id, productId, quantity);

      res.status(StatusCodes.OK).json(sale);
    } catch (error) {
      next(error);
    }
  }),
);

router.delete(
  '/:id',
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
