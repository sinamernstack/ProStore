const { default: mongoose } = require("mongoose");
const Schema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, required: true },
    title: { type: string, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], required: true },
    category: { type: mongoose.Types.ObjectId, required: true },
    comments: { type: [], required: true },
    like: { type: [mongoose.Types.ObjectId] },
    dislike: { type: [mongoose.Types.ObjectId] },
    bookmark: { type: [mongoose.Types.ObjectId] },
  },

  {
    timeseries: true,
  },
);
const BlogModel = mongoose.model("blog", Schema);
module.exports = {
  BlogModel,
};
