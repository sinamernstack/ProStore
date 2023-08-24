const { default: mongoose } = require("mongoose");
const Schema = new mongoose.Schema({
  title: { type: String, required: true },
});
const CategoryModel = mongoose.model("category", Schema);
module.exports = {
  CategoryModel,
};
