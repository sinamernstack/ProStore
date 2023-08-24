const { UserAuthController } = require("../../http/controllers/user/auth/auth.controller")

const router =require("express").Router()
/**
 * @swagger
 *  /login/get-otp:
 *   post:
 *       tags : [User-Otp] 
 *       summary: login user in userpanel with phonenumber
 *       description: one time password(otp)
 *       parameters:
 *       -    name: mobile
 *            description: fa-IRI phonenumber
 *            in: formData
 *            required: true
 *            type: string
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
 *       parameters:
 *       -    name: mobile
 *            description: fa-IRI phonenumber
 *            in: formData
 *            required: true
 *            type: string
 *       -    name: code
 *            description: enter sms code recived      
 *            in: formData
 *            required: true
 *            type: string
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
 *       parameters:
 *       -    name: refreshToken
 *            description: fa-IRI phonenumber
 *            in: body
 *            required: true
 *            type: string
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