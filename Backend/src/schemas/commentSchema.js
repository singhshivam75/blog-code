const Joi = require("joi");

const addCommentSchema = Joi.object({
  text: Joi.string().min(1).max(500).required().messages({
    "string.empty": "Comment text is required",
    "string.min": "Comment cannot be empty",
    "string.max": "Comment cannot exceed 500 characters",
  }),
}).unknown(false);

module.exports = { addCommentSchema };
