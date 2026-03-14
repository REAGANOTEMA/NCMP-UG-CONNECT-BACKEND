import Joi from "joi";

export const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("Admin", "MP", "Citizen").default("Citizen"),
  phone: Joi.string().allow(""),
  district: Joi.string().allow(""),
  region: Joi.string().allow(""),
  constituency: Joi.string().allow(""),
  nationalId: Joi.string().allow("")
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});