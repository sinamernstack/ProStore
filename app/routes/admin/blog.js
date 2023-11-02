const {
  BlogController,
  AdminBlogController,
} = require("../../http/controllers/admin/blog.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const router = require("express").Router();
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
 *            - multipart/form-data
 *            - application/x-www-form-data-urlencoded
 *
 *       parameters:
 *           -     in: header
 *                 name: access-token
 *                 required: true
 *                 type: string
 *           -     in: formData
 *                 name: title
 *                 required: true
 *                 type: string
 *           -     in: formData
 *                 name: text
 *                 required: true
 *                 type: string
 *           -     in: formData
 *                 name: short_text
 *                 required: true
 *                 type: string
 *           -     in: formData
 *                 name: tags
 *                 type: string
 *                 example: tag1#tag2#tag3#foo_bar || str || undifinded
 *           -     in: formData
 *                 name: category
 *                 required: true
 *                 type: string
 *           -     in: formData
 *                 name: image
 *                 required: true
 *                 type: file
 *           -     in: formData
 *                 name: author
 *                 required: true
 *                 type: string
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
 *                 require : true
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
 *                 require : true
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
 *    patch:
 *       tags : [Blog(AdminPanel)]
 *       summary: create blog document
 *       consumes:
 *            - multipart/form-data
 *            - application/x-www-form-data-urlencoded
 *
 *       parameters:
 *           -     in: header
 *                 name: access-token
 *                 required: true
 *                 type: string
 *           -     in: path
 *                 name: id
 *                 required: true
 *                 type: string
 *           -     in: formData
 *                 name: title
 *
 *                 type: string
 *           -     in: formData
 *                 name: text
 *
 *                 type: string
 *           -     in: formData
 *                 name: short_text
 *
 *                 type: string
 *           -     in: formData
 *                 name: tags
 *                 type: string
 *                 example: tag1#tag2#tag3#foo_bar || str || undifinded
 *           -     in: formData
 *                 name: category
 *
 *                 type: string
 *           -     in: formData
 *                 name: image
 *
 *                 type: file
 *           -     in: formData
 *                 name: author
 *
 *                 type: string
 *
 *       responses:
 *           201:
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
