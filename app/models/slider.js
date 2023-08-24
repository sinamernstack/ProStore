const { default: mongoose } = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    title: { type: String },
    text: { type: String },
    images: { type: String, required: true },
    type: { type: String, default: "main" },
  },

  {
    timeseries: true,
  },
);
const SliderModel = mongoose.model("slider", UserSchema);
module.exports = {
  SliderModel,
};
