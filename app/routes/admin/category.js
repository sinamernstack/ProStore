const categoryController = require("../../http/controllers/admin/category.controller")
const { CategoryController } = require("../../http/controllers/admin/category.controller")

const router = require("express").Router()



/**
 * @swagger
 *  /admin/category/add:
 *    post:
 *       tags : [Admin-Panel] 
 *       summary: create new category title
 *       description: category maker
 *       parameters:
 *          -    name: title
 *               in: formData
 *               required: true
 *               type: string 
 *          -    name: parent
 *               in: formData
 *               required: false
 *               type: string   
 *       
 *       responses:
 *           201:
 *               description: Success
 *           
 * 
 * 
 *  
 */ 
router.post("/add",categoryController.addCategory)

/**
 * @swagger
 *  /admin/category/parents:
 *    get:
 *       tags : [Admin-Panel] 
 *       summary: get All parents of Category or Ctegory Heads
 *             
 *       responses:
 *           200:
 *               description: Success
 *           
 *  
 */ 




router.get("/parents",categoryController.getAllParentsCategory)

/**
 * @swagger
 *  /admin/category/children/{parent}:
 *    get:
 *       tags : [Admin-Panel] 
 *       summary: get All children of parents of Category 
 *       parameters:
 *          -    name: parent
 *               in: path
 *               required: true
 *               type: string       
 *       responses:
 *           200:
 *               description: Success
 *  
 */ 



router.get("/children/:parent",categoryController.getChildOfParentCategory)


/**
 * @swagger
 *  /admin/category/all:
 *    get:
 *       tags : [Admin-Panel] 
 *       summary: get All  Category 
 *             
 *       responses:
 *           200:
 *               description: Success
 *           
 *  
 */ 




router.get("/all",categoryController.getAllCategory)


/**
 * @swagger
 *  /admin/category/remove/{id}:
 *    delete:
 *       tags : [Admin-Panel] 
 *       summary: remove category by id
 *       parameters:
 *           -   in: path
 *               name: id
 *               type: string      
 *               required: true
 *       responses:
 *           200:
 *               description: Success
 *           
 *  
 */ 
router.delete("/remove/:id",categoryController.removeCategory)

module.exports={CategoryRoutes : router}