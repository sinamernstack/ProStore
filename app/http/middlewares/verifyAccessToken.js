const createError = require("http-errors");
const { UserModel } = require("../../models/users");
const JWT =require("jsonwebtoken");
const {ACCESS_TOKEN_SECRET_KEY} = require("../../utils/constans");


function verifyAccessToken(req, res, next) {
  const headers = req.headers;
const [bearer,token] =headers?.authorization?.split(" ") || []
 

  if (token ) {
    JWT.verify(
      token,
      ACCESS_TOKEN_SECRET_KEY,
      async (err, payload) => {
        if (err)
          return next(
            createError.Unauthorized("!!لطفن مجددن وارد حساب کار بری خود شوید")
          );
        const { mobile } = payload || {};
        const user = await UserModel.findOne(
          { mobile },
          { password: 0, otp: 0 }
        );
        if (!user) return next(createError.Unauthorized("!خساب کاربری یافت نشد "));
        req.user = user;
        return next();
      }
    );
  } else
    return next(
      createError.Unauthorized("!لطفن مجددن وارد حساب کار بری خود شوید")
    );
}
function checkRole(role) {
  return function (req, res, next) {
    try {
      const user = req.user;
      console.log(user.roles);
      if (user?.roles.includes(role)) {
        
        return next();
      }
      throw createError.Forbidden("شما دسترسی لازم را ندارید");
    } catch (error) {
      next(error);
    }
  };
}
module.exports = { verifyAccessToken,checkRole };
