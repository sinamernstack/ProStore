const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  comment: { type: String },
  parent: { type: mongoose.Types.ObjectId },
});
const Schema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: "users" },
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String] },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
    comments: { type: [commentSchema], default: [] },
    like: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
    dislike: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
    bookmark: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
);
Schema.virtual("user", {
  ref: "user",
  localField: "_id",
  foreignField: "author",
});
Schema.virtual("category_detail", {
  ref: "category",
  localField: "_id",
  foreignField: "category",
});

const BlogModel = mongoose.model("blog", Schema);
module.exports = {
  BlogModel,
};
