const mongoose = require("mongoose");

const EpisodeSchema = mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String, default: "free" },
  time: { type: String, required: true },
});

const ChapterSchema = mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true, default: "" },
  episodes: { type: [EpisodeSchema] },
});

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  short_text: { type: String, required: true },

  image: { type: [String], required: true },
  tags: { type: [String], default: [] },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "category",
    required: true,
  },
  comments: { type: [], default: [] },
  likes: { type: [mongoose.Types.ObjectId], default: [] },
  dislikes: { type: [mongoose.Types.ObjectId], default: [] },
  bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  count: { type: Number },
  type: { type: String, default: "free" }, // free, cashspecial
  time: { type: String, default: "00:00" },
  supplier: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  chapters: { type: [ChapterSchema] },
  students: { type: [mongoose.Types.ObjectId], default: [], ref: "user" },
});
ProductSchema.index({text:"text"});

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = {
  ProductModel,
};
