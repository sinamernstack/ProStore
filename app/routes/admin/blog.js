const {
  BlogController,
  AdminBlogController,
} = require("../../http/controllers/admin/blog.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const router = require("express").Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
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
 *                      description: the title of category
 *                   shor_text:
 *                      type: string
 *                      description: the short text of category
 *                   text:
 *                      type: string
 *                      description: the text of category
 *                   tags:
 *                      type: string
 *                      description: the tags of category
 *                   category:
 *                      type: string
 *                      description: the category of category
 *                   image:
 *                      type: file
 *                      description: the image of category
 *
 */

/**
 * @swagger
 *  /admin/blogs:
 *    get:
 *       tags : [Blog(AdminPanel)]
 *       summary: get All blogs
 *       parameters:
 *           -     in: header
 *                 name: access-token
 *
 *                 type: string*
 *       responses:
 *           200:
 *               description: Success
 *
 *
 */
router.get("/", AdminBlogController.getListOfBlogs);

/**
 * @swagger
 *  /admin/blogs/add:
 *    post:
 *       tags : [Blog(AdminPanel)]
 *       summary: create blog document
 *       consumes:
 *           -   multipart/form-data       
 *       requestBody:
 *           required: true
 *           content:
 *                 multipart/form-data:
 *                     schema:
 *                         $ref: '#components/schemas/Blog'
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
  uploadFile.single("image"),
  stringToArray("tags"),
  AdminBlogController.createBlog
);

/**
 * @swagger
 *  /admin/blogs/{id}:
 *    get:
 *       tags : [Blog(AdminPanel)]
 *       summary: get one blog by id
 *       parameters:
 *           -     in : path
 *                 name : id
 *                 type: string
 *                 required : true
 *           -     in: header
 *                 name: access-token
 *                 type: string
 *                 require : true
 *       responses:
 *           200:
 *               description: Success
 *
 *
 */
router.get("/:id", AdminBlogController.getOneBlogById);

/**
 * @swagger
 *  /admin/blogs/{id}:
 *    delete:
 *       tags : [Blog(AdminPanel)]
 *       summary: delete one blog by id
 *       parameters:
 *           -     in : path
 *                 name : id
 *                 type: string
 *                 required : true
 *           -     in: header
 *                 name: access-token
 *                 type: string
 *                 require : true
 *       responses:
 *           200:
 *               description: Success
 *
 *
 */
router.delete("/:id", AdminBlogController.deleteBlogById);

/**
 * @swagger
 *  /admin/blogs/update/{id}:
 *    get:
 *       tags : [Blog(AdminPanel)]
 *       summary: get one blog by id
 *       consumes:
 *           -   multipart/form-data       
 *       requestBody:
 *           required: true
 *           content:
 *                 multipart/form-data:
 *                     schema:
 *                         $ref: '#components/schemas/Blog'
 *       parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true

 *       responses:
 *           200:
 *               description: Success
 *
 *
 */

router.patch(
  "/update/:id",
  uploadFile.single("image"),
  stringToArray("tags"),
  AdminBlogController.updateBlogById
);
module.exports = { BlogAdminApiRouter: router };
