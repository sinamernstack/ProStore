const { authSchema } = require("../../validators/user/auth.schema");
const Controller = require("../controller");
const createError = require("http-errors");

module.exports = new (class HomeController extends Controller {
  async indexPage(req, res, next) {
    try {
      // await authSchema.validateAsync(req.body)
      return res.status(200).send("salammmmm");
    } catch (error) {
      next(createError.BadRequest(error.message));
    }
  }
});
