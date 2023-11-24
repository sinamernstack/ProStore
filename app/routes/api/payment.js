const { PymentController } = require("../../http/controllers/api/payment.controller")
const { verifyAccessToken } = require("../../http/middlewares/verifyAccessToken")


const router = require("express").Router()
/**
 * @swagger
 *  /admin/payment:
 *       post:
 *          tags: [Payment(AdminPanel)]
 *          summery: payment of site
 *          responses: 
 *                200:
 *                    description: success
 */
router.post("/",verifyAccessToken,PymentController.basketPayment)
router.post("/verify",()=>{})
module.exports = {
    AdminAPiPayment: router,
  };