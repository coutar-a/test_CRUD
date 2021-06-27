const Joi = require("joi")


const playerCreationSchema = Joi.object({
    name: Joi.string().required(),
    number: Joi.number().required(),
    team: Joi.string().required()
  });

  const playerUpdateSchema = Joi.object({
    name: Joi.string().optional(),
    number: Joi.number().optional(),
    team: Joi.string().optional()
  });

  module.exports = {playerCreationSchema, playerUpdateSchema}