const { default: mongoose } = require("mongoose");
const Schema = new mongoose.Schema({
  title: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId,default: undefined},
});
const CategoryModel = mongoose.model("category", Schema);
module.exports = {
  CategoryModel,
};
