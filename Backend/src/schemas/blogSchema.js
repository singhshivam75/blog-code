const Joi = require("joi");

const createBlogSchema = Joi.object({
  title: Joi.string().trim().min(3).max(200).required(),
  description: Joi.string().trim().min(10).required(),
  isPublished: Joi.boolean().default(true),
});

const updateBlogSchema = Joi.object({
  title: Joi.string().trim().min(3).max(200).optional(),
  description: Joi.string().trim().min(10).optional(),
  image: Joi.string().uri().allow("", null).optional(),
  isPublished: Joi.boolean().optional(),
}).min(1);

module.exports = {
  createBlogSchema,
  updateBlogSchema,
};
