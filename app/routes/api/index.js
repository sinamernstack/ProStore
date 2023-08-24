const swaggerJSDoc = require("swagger-jsdoc");
const homeController = require("../../http/controllers/api/home.controller");
const { verifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const router = require("express").Router();


/**
 * @swagger
 * tag: IndexPage
 * /:
 *   get:
 *       summary: index of routes
 *       tags: [IndexPage]
 *       description: get all need data for index page
 *       parameters:
 *            -   in: header
 *                name: access-token
 *                example: Bearer Token
 *       responses:
 *           200:
 *               description: success
 *           404: 
 *               description: not founded
 */ 



router.get("/",verifyAccessToken ,homeController.indexPage);
module.exports = {
  HomeRoutes: router,
};
