const Joi = require("@hapi/joi");
const { MongoPaternID } = require("../../../utils/constans");
const createError = require("http-errors");

const createBlogSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .required()
    .error(new Error("عنوان بلاگ باید بین 3 تا 30 کاراکتر باشد")),
  text: Joi.string().required().error(new Error("متن بلاگ نمی‌تواند خالی باشد")),
  short_text: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("متن کوتاه باید بین 3 تا 30 کاراکتر باشد")),
  image: Joi.string().error(new Error("تصویر ارسال شده صحیح نیست")),
  category: Joi.string()
    .pattern(MongoPaternID)
    .error(new Error("عنوان دسته بندی صحیح نیست")),
  tags: Joi.string()
    .max(20)
    .error(new Error("تعداد تگ نمی‌تواند بیشتر از 20 کاراکتر باشد")),
});



module.exports = { createBlogSchema, updateCategorySchema };
