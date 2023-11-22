const { ProductController } = require("../../http/controllers/admin/product.controller")
const { stringToArray } = require("../../http/middlewares/stringToArray")
const { uploadFile } = require("../../utils/multer")


const router = require("express").Router()
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
 *                      description: the text of category
 *                   tags:
 *                      type: array
 *                      description: the tags of category
 *                   category:
 *                      type: string
 *                      description: the category of product
 *                   count:
 *                      type: string
 *                      description: the image of category
 *                   discount:
 *                      type: string
 *                      description: the image of category
 *                   image:
 *                      type: file
 *                      description: the image of category
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


router.post("/add",uploadFile.single("image"),stringToArray("tags"),ProductController.addProduct)
// router.patch()
// router.delete()
// router.get()
// router.get()

module.exports={
    AdminAPiProductRouter : router
}
