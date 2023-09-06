const Joi = require("joi");
const { MongoPaternID } = require("../../../utils/constans");

const addCategorySchema = Joi.object({
  title: Joi.string().min(3).max(30).required().error(new Error("عنوان دسته بندی صحیح نیست")),
  parent: Joi.string().min(3).max(30).pattern(MongoPaternID).allow(null).error(new Error("پرنت دسته بندی صحیح نیست")),
});

module.exports = { addCategorySchema };
