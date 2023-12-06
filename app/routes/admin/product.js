const productController = require("../../http/controllers/admin/product.controller");
const {
  ProductController,
} = require("../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();
/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   image
 *              properties:
 *                   title:
 *                      type: string
 *                      description: the title of product
 *                   short_text:
 *                      type: string
 *                      description: the short text of product
 *                   text:
 *                      type: string
 *                      description: the text of product
 *                   tags:
 *                      type: array
 *                      description: the tags of product
 *                   category:
 *                      type: string
 *                      description: the category of product
 *                   count:
 *                      type: number
 *                      description: the count of product
 *                   price:
 *                      type: number
 *                      description: the price of product
 *                   discount:
 *                      type: number
 *                      description: the discount of product
 *                   image:
 *                      type: array
 *                      items:
 *                           type: string
 *                           format: binary
 *                      description: the image of product
 *
 *
 *
 */

/**
 * @swagger
 *  /admin/product/add:
 *    post:
 *       tags : [Product(AdminPanel)]
 *       summary: create blog document
 *       consumes:
 *           -   multipart/form-data
 *       requestBody:
 *           required: true
 *           content:
 *                 multipart/form-data:
 *                     schema:
 *                         $ref: '#components/schemas/Product'
 *
 *
 *       responses:
 *           201:
 *               description: Success
 *
 *
 */

router.post(
  "/add",
  uploadFile.array("image", 10),
  stringToArray("tags"),

  ProductController.addProduct
);

/**
 * @swagger
 *  /admin/product/list:
 *    get:
 *       tags : [Product(AdminPanel)]
 *       summary: get All products
 *       parameters:
 *            -   in: query
 *                name: search
 *                type: string
 *                description: text for search in title , short_text of(product)
 *       responses:
 *           200:
 *               description: Success
 *
 *
 */
router.get("/list", ProductController.getAllProducts);

/**
 * @swagger
 *  /admin/product/list/{id}:
 *    get:
 *       tags : [Product(AdminPanel)]
 *       summary: get products by id
 *       parameters:
 *           -     in : path
 *                 name : id
 *                 type: string
 *                 required : true
 *                 description: objectId of Product
 *       responses:
 *           200:
 *               description: Success
 *
 *
 */

router.get("/list/:id", ProductController.getOneProduct);

/**
 * @swagger
 *  /admin/product/remove/{id}:
 *    delete:
 *       tags : [Product(AdminPanel)]
 *       summary: get products by id
 *       parameters:
 *           -     in : path
 *                 name : id
 *                 type: string
 *                 required : true
 *                 description: objectId of Product
 *       responses:
 *           200:
 *               description: Success
 *
 *
 */

router.delete("/remove/:id", ProductController.removeProduct);

/**
 * @swagger
 *  /admin/product/edit/{id}:
 *    patch:
 *       tags : [Product(AdminPanel)]
 *       summary: edit product
 *       parameters:
 *           -     in : path
 *                 name : id
 *                 type: string
 *                 required : true
 *                 description: edit Product with id
 *       requestBody:
 *           required: true
 *           content:
 *                 multipart/form-data:
 *                     schema:
 *                         $ref: '#components/schemas/Product'
 *
 *
 *       responses:
 *           201:
 *               description: Success
 *
 *
 */

router.patch(
  "/edit/:id",
  uploadFile.array("image", 10),
  stringToArray("tags"),
  ProductController.editProduct
);

module.exports = {
  AdminAPiProductRouter: router,
};
