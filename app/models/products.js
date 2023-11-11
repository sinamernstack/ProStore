const { default: mongoose } = require("mongoose");
const Episode = mongoose.Schema({
  title: {type:String,required:true},
  text: {type:String,required:true},
  type:{type:String,default:"free"},
  time: {type:String,required:true},
});

const Chapter = mongoose.Schema({
  title: {type:String,required:true,required:true},
  text:{type:String,required:true,default:""},
  episodes:{type:[Episode]}
});

const Schema = new mongoose.Schema(
  {
    title: { type: {type:String,required:true}, required: true },
    text: { type: {type:String,required:true}, required: true },
    short_desc: { type: {type:String,required:true}, required: true },
    long_desc: { type: {type:String,required:true}, required: true },
    images: { type: {type:String,required:true}, required: true },
    tags: { type: [{type:String,required:true}], default: [] },
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
    type: { type: {type:String,required:true}, required: true,default:"free"/**free,cashspecial */ }, //virtual - physical
    time: { type: {type:String,required:true}, default: "00:00" },
    supplier: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    chapter:{type:[Chapter]},
    students:{type:[mongoose.Types.ObjectId],default:[],ref:"user"}
  },

  {
    timeseries: true,
  }
);
const ProductModel = mongoose.model("product", Schema);
module.exports = {
  ProductModel,
};
