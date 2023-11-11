const categoryController = require("../../http/controllers/admin/category.controller")
const { CategoryController } = require("../../http/controllers/admin/category.controller")

const router = require("express").Router()


/**
 * @swagger
 *  components:
 *      schemas:    
 *          Category:
 *              type: object
 *              required:
 *                  -   title
 *              properties:    
 *                   title:
 *                      type: string
 *                      description: the title of category
 *                   parent:
 *                      type: string
 *                      description: the parent of category 
 */

/**
 * @swagger
 *  /admin/category/add:
 *    post:
 *       tags : [Admin-Panel] 
 *       summary: create new category title
 *       description: category maker
 *       requestBody:
 *           required: true
 *           content:
 *                application/x-www-form-urlencoded:
 *                     schema:
 *                         $ref: '#components/schemas/Category'
 *                application/json:
 *                     schema:
 *                         $ref: '#components/schemas/Category' 
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
 *  /admin/category/edit/{id}:
 *    put:
 *       tags : [Admin-Panel] 
 *       summary: edit or update category title with object id
 *       description: UPDATE category
 *       parameters:
 *          -    name: id
 *               in: path
 *               required: true
 *               type: string 
 *       requestBody:
 *           required: true
 *           content:
 *                application/x-www-form-urlencoded:
 *                     schema:
 *                         $ref: '#components/schemas/Category'
 *                application/json:
 *                     schema:
 *                         $ref: '#components/schemas/Category' 
 *       
 *       responses:
 *           200:
 *               description: Success
 *           
 *               
 *           
 * 
 * 
 *  
 */ 
router.put("/edit/:id",categoryController.editCategory)



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
 *  /admin/category/list-of-all:
 *    get:
 *       tags : [Admin-Panel] 
 *       summary: read all categories without populate
 *    
 *       responses:
 *           200:
 *               description: Success
 *           
 *  
 */ 
router.get("/list-of-all",categoryController.getAlltCategoryWithoutPopulate)






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


/**
 * @swagger
 *  /admin/category/{id}:
 *    get:
 *       tags : [Admin-Panel] 
 *       summary: read category by id
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
router.get("/:id",categoryController.getCategoryById)


module.exports={CategoryRoutes : router}