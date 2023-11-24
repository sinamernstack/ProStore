const Joi = require("@hapi/joi");
const { MongoPaternID } = require("../../../utils/constans");
const createError = require("http-errors");
const ObjectIdValidator = Joi.object({
  id: Joi.string()
    .pattern(MongoPaternID)
    .error(new Error(createError.BadRequest("آیدی محصول صحیح نیست"))),
});
module.exports = { ObjectIdValidator };