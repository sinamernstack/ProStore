const mongoose = require("mongoose")
const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    comment: { type: String },
    parent: { type: mongoose.Types.ObjectId ,ref:"comment"},
  });
  module.exports={commentSchema,}