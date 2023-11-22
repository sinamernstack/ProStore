const Joi = require("@hapi/joi");
const { MongoPaternID } = require("../../../utils/constans");
const createError = require("http-errors");

const createProductSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .required()
    .error(new Error("عنوان بلاگ باید بین 3 تا 30 کاراکتر باشد")),
  text: Joi.string()
    .required()
    .error(new Error("متن بلاگ نمی‌تواند خالی باشد")),
  short_text: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("متن کوتاه باید بین 3 تا 30 کاراکتر باشد")),

  category: Joi.string()
    .pattern(MongoPaternID)
    .error(new Error("عنوان دسته بندی صحیح نیست")),
  tags: Joi.string()
    .max(20)
    .error(new Error("تعداد تگ نمی‌تواند بیشتر از 20 کاراکتر باشد")),
  price: Joi.number().error(new Error("قیمت وارد شده صحیح نیست")),
  count: Joi.number().error(new Error(" تعداد وارد شده صحیح نیست")),
  discount: Joi.number().error(new Error("تخفیف وارد شده صحیح نیست")),

  filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .max(20)
    .error(new Error("تعداد تگ نمی‌تواند بیشتر از 20 کاراکتر باشد")),
  fileUploadPath: Joi.allow()
    .max(20)
    .error(new Error("تعداد تگ نمی‌تواند بیشتر از 20 کاراکتر باشد")),
});

module.exports = { createProductSchema };
