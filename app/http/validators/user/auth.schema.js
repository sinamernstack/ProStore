const Joi = require("@hapi/joi");

const getOtpSchema = Joi.object({
  mobile: Joi.string()
    .regex(/^09\d{9}$/) // Validates mobile numbers starting with '09' and followed by 9 digits
    .required()
    .messages({
      "string.base": "شماره موبایل باید یک رشته باشد",
      "string.empty": "شماره موبایل نمی‌تواند خالی باشد",
      "string.pattern.base": "شماره موبایل وارد شده صحیح نیست. شماره موبایل باید با '09' شروع شود و 9 رقم دیگر داشته باشد.",
      "string.length": "شماره موبایل باید دقیقاً 11 رقم باشد",
      "any.required": "شماره موبایل اجباری است",
    }),
});

const checkOtpSchema = Joi.object({
  mobile: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .messages({
      "string.base": "شماره موبایل باید یک رشته باشد",
      "string.empty": "شماره موبایل نمی‌تواند خالی باشد",
      "string.length": "شماره موبایل باید دقیقاً 11 رقم باشد",
      "string.pattern.base": "شماره موبایل باید شامل اعداد باشد",
    }),
  code: Joi.string().length(5).pattern(/^[0-9]+$/).messages({
    "string.base": "کد OTP باید یک رشته باشد",
    "string.empty": "کد OTP نمی‌تواند خالی باشد",
    "string.length": "کد OTP باید دقیقاً 5 رقم باشد",
    "string.pattern.base": "کد OTP باید شامل اعداد باشد",
  }),
});

module.exports = { getOtpSchema, checkOtpSchema };
