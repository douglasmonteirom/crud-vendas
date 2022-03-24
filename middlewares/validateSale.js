const Joi = require('joi');

const schemaObject = Joi.object({
  productId: Joi.number().positive().required().messages({
    'any.required': '400|"productId" is required',
    'number.positive': '422|"productId" must be greater than or equal to 1',
  }),
  quantity: Joi.number().positive().required()
  .messages({
    'any.required': '400|"quantity" is required',
    'number.positive': '422|"quantity" must be greater than or equal to 1',
  }),
});

const schemaArray = Joi.array().items(schemaObject).has(schemaObject).messages({
  'array.base': '400|"value" must be an array!!',
  'array.hasUnknown': '400|"objects" is required in request',
});

module.exports = {
  schemaArray,
  schemaObject,
};
