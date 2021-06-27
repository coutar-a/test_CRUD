const Joi = require("joi")


const playerCreationSchema = Joi.object({
    id: Joi.string(),
    name: Joi.string(),
    number: Joi.number(),
    team: Joi.string()
  });

  const playerUpdateSchema = Joi.object({
    name: Joi.string().optional(),
    number: Joi.number().optional(),
    team: Joi.string().optional()
  });

  module.exports = {playerCreationSchema, playerUpdateSchema}