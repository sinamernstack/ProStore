const createError = require("http-errors");
const { UserModel } = require("../../models/users");
const JWT =require("jsonwebtoken");
const {ACCESS_TOKEN_SECRET_KEY} = require("../../utils/constans");


function verifyAccessToken(req, res, next) {
  const headers = req.headers;
const [token] =headers?.["access-token"]?.split(" ") || []

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
module.exports = { verifyAccessToken };
