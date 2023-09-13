const { BlogController, AdminBlogController } = require("../../http/controllers/admin/blog.controller");

const router = require("express").Router();
/**
 * @swagger
 *  /admin/blogs:
 *    get:
 *       tags : [Blog(AdminPanel)] 
 *       summary: get All blogs
 *             
 *       responses:
 *           200:
 *               description: Success
 *           
 *  
 */ 
router.get("/",AdminBlogController.getListOfBlogs)
module.exports = { BlogAdminApiRouter: router };
