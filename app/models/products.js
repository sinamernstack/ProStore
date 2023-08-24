const { default: mongoose } = require("mongoose");
const Schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    short_desc: { type: String, required: true },
    long_desc: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], default: [] },
    category: { type: mongoose.Types.ObjectId, required: true },
    comments: { type: [], default: [] },
    like: { type: [mongoose.Types.ObjectId], default: [] },
    dislike: { type: [mongoose.Types.ObjectId], default: [] },
    bookmark: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number },
    type: { type: String, required: true },
    time: { type: String },
    format: { type: String },
    teacher: { type: [mongoose.Types.ObjectId], required: true },
    feture: {
      type: Object,
      default: {
        length: "",
        height: "",
        width: "",
        weight: "",
        color: "",
        model: "",
        madein: "",
      },
    },
  },

  {
    timeseries: true,
  },
);
const ProductModel = mongoose.model("product", Schema);
module.exports = {
  ProductModel,
};
