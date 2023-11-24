const { verifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { AdminAPiPayment } = require("../api/payment");
const { BlogAdminApiRouter } = require("./blog");
const { CategoryRoutes } = require("./category");
const { AdminAPiProductRouter } = require("./product");

const router = require("express").Router();
/**
 * @swagger
 *  tags:
 *      name : Admin-Panel
 *      description : action of admin (add,remove,edit)
 *      name : Blog(Admin-Panel)
 *      description : action of admin (add,remove,edit) blog
 *      name : product(Admin-Panel)
 *      description : action of product
 *
 */
router.use("/category",CategoryRoutes)
router.use("/blogs",BlogAdminApiRouter)
router.use("/product",AdminAPiProductRouter)
router.use("/payment",AdminAPiPayment)


module.exports = {
  AdminRoutes: router,
};