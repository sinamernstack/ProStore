const Joi = require("joi");

const getOtpSchema = Joi.object({
  mobile: Joi.string().length(11).error(new Error("شماره موبایل صحیح نیست"))
});

const checkOtpSchema = Joi.object({
  mobile: Joi.string().length(11).min(11),
  code:Joi.string().length(5)
});
module.exports = {getOtpSchema,checkOtpSchema};
