const { default: mongoose } = require("mongoose");
const Schema = new mongoose.Schema(
  {
    frist_name: { type: String },
    last_name: { type: String },
    username: { type: String, lowercase: true },
    mobile: { type: String, required: true },
    email: { type: String, lowercase: true },
    password: { type: String },
    otp: {
      type: Object,

      default: {
        code: 0,
        expiresIn: 0,
      },
    },
    buills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    birthday: { type: String },
    roles: { type: [String], default: ["USER"] },
    Courses : {type:[mongoose.Types.ObjectId],ref:"course",default:[]}
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);
const UserModel = mongoose.model("users", Schema);
module.exports = {
  UserModel,
};
