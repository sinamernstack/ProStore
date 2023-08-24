const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { UserModel } = require("../models/users");
const { REFRESHTOKEN, ACCESS_TOKEN_SECRET_KEY } = require("./constans");

function randomNumberGenerator() {
  return Math.floor(Math.random() * 90000 + 10000);
}
function SignAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId).then((res) => res);
    const payload = {
      mobile: user.mobile,
      userID: user._id,
    };
    const secret = ACCESS_TOKEN_SECRET_KEY;
    const options = {
      expiresIn: "1h",
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) reject(createError.InternalServerError("خطای سروری"));
      resolve(token);
    });
  });
}

function SignRefreshToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId).then((res) => res);
    const payload = {
      mobile: user.mobile,
      userID: user._id,
    };
    const secret = REFRESHTOKEN;
    const options = {
      expiresIn: "1y",
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) reject(createError.InternalServerError("خطای سروری"));
      resolve(token);
    });
  });
}

function verifyRefreshToken(token) {
  return new Promise((resolve,reject)=>{
    JWT.verify(token, REFRESHTOKEN, async (err, payload) => {
      if (err) return next(createError.Unauthorized("!!لطفن مجددن وارد حساب کار بری خود شوید"));
      const { mobile } = payload || {}
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
      if (!user) return next(createError.Unauthorized("!خساب کاربری یافت نشد "));
      resolve(mobile)
    });
  })
}

module.exports = {
  randomNumberGenerator,
  SignAccessToken,
  SignRefreshToken,
  verifyRefreshToken,
};
