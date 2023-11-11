const swaggerJsdoc = require("swagger-jsdoc")
const { UserAuthController } = require("../../http/controllers/user/auth/auth.controller")

const router =require("express").Router()

/**
 * @swagger
 *  components:
 *      schemas:    
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:    
 *                   mobile:
 *                      type: string
 *                      description: the user mobile for sign-up
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              peroperties:
 *                   mobile:
 *                      type: string
 *                      description: them user mobile for sign-up
 *                   code:
 *                      type: integer
 *                      description: recived code from getOTP 
 * 
 */
/** 
@swagger
* components:
*   schemas:
*     CheckOTP:
*       type: object
*       required:
*         - mobile
*         - code
*       properties:
*         mobile:
*           type: string
*           description: The user's mobile for sign-up
*         code:
*           type: integer
*           description: Received code from GetOTP

*/
/**
* @swagger
*  components:
*   schemas:
*     RefreshToken:
*       type: object
*       required:
*         - refreshToken
*       properties:
*         refreshToken:
*           type: string
*           description: The refresh token for obtaining a new access token

 */
/**
 * @swagger
 *  /login/get-otp:
 *   post:
 *       tags : [User-Authentication] 
 *       summary: login user in userpanel with phonenumber
 *       description: one time password(otp)
 *       requestBody:
 *           required: true
 *           content:
 *                application/x-www-form-urlencoded:
 *                     schema:
 *                         $ref: '#components/schemas/GetOTP'
 *                application/json:
 *                     schema:
 *                         $ref: '#components/schemas/GetOTP' 
 *       responses:
 *           201:
 *               description: Success
 *           400: 
 *               description: Bad Request
 *           401:
 *               description: Unauthorization
 *           500:
 *               description: Internal Server Error     
 * 
 * 
 *  
 */ 


router.post("/get-otp",UserAuthController.getOtp)

/**
 * @swagger
 *  /login/check-otp:
 *   post:
 *       tags : [User-Authentication] 
 *       summary: check otp value in user controller
 *       description: check otp with code
 *       requestBody:
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: '#/components/schemas/CheckOTP'
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CheckOTP'
 *       responses:
 *           201:
 *               description: Success
 *           400: 
 *               description: Bad Request
 *           401:
 *               description: Unauthorization
 *           500:
 *               description: Internal Server Error     
 * 
 * 
 *  
 */ 
router.post("/check-otp",UserAuthController.checkOtp)


/**
 * @swagger
 *  /login/refresh_token:
 *   post:
 *       tags : [User-Authentication] 
 *       summary: send refresh token for get new token
 *       description: fresh token
 *       requestBody:
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: '#/components/schemas/RefreshToken'
 *       
 *       responses:
 *           200:
 *               description: Success
 *           400: 
 *               description: Bad Request
 *           401:
 *               description: Unauthorization
 *           500:
 *               description: Internal Server Error     
 * 
 * 
 *  
 */ 
router.post("/refresh_token",UserAuthController.refreshToken)


module.exports = {
    UserAuth: router, 
  };