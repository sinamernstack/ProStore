const createError = require("http-errors");
const {
  getOtpSchema,
  checkOtpSchema,
} = require("../../../validators/user/auth.schema");
const {
  randomNumberGenerator,
  SignAccessToken,
  verifyRefreshToken,
  SignRefreshToken,
} = require("../../../../utils/functions");
const { UserModel } = require("../../../../models/users");
const {  USER_ROLE } = require("../../../../utils/constans");
const Controller = require("../../controller");


const router = require("express").Router();
class UserAuthController extends Controller {
  async getOtp(req, res, next) {
    try {
      const validationResult = getOtpSchema.validate(req.body);

    if (validationResult.error) {
      // Handle validation errors
      return res.status(400).json({
        error: validationResult.error.details[0].message,
      });
    }
      const { mobile } = req.body;

      const code = randomNumberGenerator();
      const result = await this.saveUser(mobile, code);
      if (!result) throw createError.BadRequest("ورود شما انجام نشد");

      return res.status(200).json({
        data: {
          statusCode: 200,
          message: " کد اعتبار سنجی برای شما فرستاده شد",
          code,
          mobile,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  //////////////////////////////////////////////////////////////save&create
  async saveUser(mobile, code) {
    let otp = {
      code,
      expiresIn: new Date().getTime() + 120000,
    };

    const result = await this.chechExistUser(mobile);
    if (result) {
      return await this.updateUser(mobile, { otp });
    }
    return !!(await UserModel.create({
      mobile,
      otp,
      roles: [USER_ROLE.USER],
    }));
  }
  //////////////////////////////////////////////////////////////exist
  async checkOtp(req, res, next) {
    try {
      const { mobile, code } = req.body;
      await checkOtpSchema.validateAsync(req.body);
      const user = await UserModel.findOne({ mobile });
      if (!user) throw createError.NotFound("کاربری با این مشخصات وجود ندارد");
      if (user.otp.code != code)
        throw createError.Unauthorized("کد ارسال شده صحیح نمیباشد");
      const now = Date.now();
      if (+user.otp.expiresIn < now)
        throw createError.Unauthorized("کد شما منقضی شده است");
      console.log(now);
      console.log(user.otp.expiresIn);
      const accesstoken = await SignAccessToken(user._id);
      const refreshtoken = await SignRefreshToken(user._id)
      return res.json({
        data: { accesstoken,refreshtoken },
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const mobile = await verifyRefreshToken(refreshToken);
      const user = await UserModel.findOne({ mobile });

      const accesstoken = await SignAccessToken(user._id);
      const newRefreshToken = await SignRefreshToken(user._id);
      return res.json({
        data: { accesstoken, refreshToken: newRefreshToken },
      });
    } catch (error) {
      next(error);
    }
  }

  //////////////////////////////////////////////////////////////checkOtp
  async chechExistUser(mobile) {
    const user = await UserModel.findOne({ mobile });
    return !!user;
  }
  ////////////////////////////////////////////////////////////update

  async updateUser(mobile, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", "0", 0, null, undefined, NaN].includes(objectData[key]))
        delete objectData[key];
    });
    const updateResult = await UserModel.updateOne(
      { mobile },
      { $set: objectData }
    );
    return !!updateResult.modifiedCount;
  }
}
module.exports = {
  UserAuthController: new UserAuthController(),
};
