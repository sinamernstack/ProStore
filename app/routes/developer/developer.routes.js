const router = require("express").Router();
const bcrypt = require("bcrypt");
const { randomNumberGenerator } = require("../../utils/functions");
/**
 * @swagger
 *  tags:
 *      name: Developer-Route
 *      description: Developers Utils
 */

/**
 /**
 * @swagger
 *  /developer/password-hash/{password}:
 *   get:
 *       tags : [Developer-Route] 
 *       summary: hash data with bcrypet
 *       description: fresh token
 *       parameters:
 *       -    name: password
 *            description: enter pass for hash
 *            in: path
 *            required: true
 *            type: string 
 *       
 *       responses:
 *           200:
 *               description: Success
 *         
 *  
 */ 
router.get("/password-hash/:password", (req, res, next) => {
  const { password } = req.params;
  const salt = bcrypt.genSaltSync(10);
  return res.send(bcrypt.hashSync(password, salt));
});


 /**
 * @swagger
 *  /developer/random-number:
 *   get:
 *       tags : [Developer-Route] 
 *       summary: get random number
 *       description: ...
 *       responses:
 *           200:
 *               description: Success
 *         
 *  
 */ 
 router.get("/random-number", (req, res, next) => {
 
  return res.send(randomNumberGenerator().toString());
});
module.exports = { DeveloperRoutes: router };
