const { verifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { BlogAdminApiRouter } = require("./blog");
const { CategoryRoutes } = require("./category");

const router = require("express").Router();
/**
 * @swagger
 *  tags:
 *      name : Admin-Panel
 *      description : action of admin (add,remove,edit)
 *      name : Blog(AdminPanel)
 *      description : crud of blogs
 */
router.use("/category",CategoryRoutes)
router.use("/blogs",verifyAccessToken,BlogAdminApiRouter)
module.exports = {
  AdminRoutes: router,
};