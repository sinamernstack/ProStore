const path = require("path");
const { addCategorySchema } = require("../../validators/admin/category.schema");
const Controller = require("../controller");
const { BlogModel } = require("../../../models/blogs");
const { deleteFileInPublic } = require("../../../utils/functions");
const createError = require("http-errors");
const { ObjectId } = require("mongodb");
class BlogController extends Controller {
  async createBlog(req, res, next) {
    try {
      const blogDataBody = await req.body;
      req.body.image = path.join(
        blogDataBody.fileUploadPath,
        blogDataBody.filename
      );
      req.body.image = req.body.image.replace(/\\/g, "/");
      const { title, text, short_text, tags, category } = blogDataBody;
      const image = await req.body.image;
      const author = await req.user._id;
      const blog = await BlogModel.create({
        title,
        image,
        text,
        short_text,
        tags,
        category,
        author,
      });
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: "وبلاگ با موفقیت ایجاد شد",
        },
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      next(error);
    }
  }

  async getOneBlogById(req, res, next) {
    try {
      const { id } = req.params;
      const blog = await this.findBlog({ _id: id });
      return res.status(200).json({
        data: {
          statusCode: 200,
          blog,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getListOfBlogs(req, res, next) {
    try {
      const blogs = await BlogModel.aggregate([
        { $match: {} },
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "author",
            as: "author",
          },
        },
        {
          $unwind: "$author",
        },
        {
          $project: {
            "author.Roles": 0,
            "author.bills": 0,
            "author.otp": 0,
            "author.__v": 0,
          },
        },
        {
          $lookup: {
            from: "categories",
            foreignField: "_id",
            localField: "category",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $project: {
            "category._id": 0,
            "category.__v": 0,
          },
        },
      ]);
      return res.status(200).json({
        data: {
          statusCode: 200,
          blogs,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getCommentOfBlog(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async deleteBlogById(req, res, next) {
    try {
      const { id } = req.params;
      await this.findBlog({ _id: id });
      const result = await BlogModel.deleteOne({ _id: id });

      if (result.deletedCount == 0)
        throw createError.InternalServerError("حذف انجام نشد");
      return res.status(200).json({
        data: { statusCode: 200, message: "بلاگ مورد نظر با موفقیت حذف شد" },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateBlogById(req, res, next) {
    try {
      const { id } = req.params;
      await this.findBlog(id);
     
      if (req?.body?.fileUploadPath && req?.body?.filename) {
        req.body.image = path.join(req.body.fileUploadPath, req.body.filename);
        req.body.image = req.body.image.replace(/\\/g, "/");
      }

      /////////////////////////////////////////////////////////////
      const data = req.body;
      let nullishData = ["", " ", "0", 0, undefined, null];
      let blackListData = ["bookmark", "dislike", "comment", "like","author"];

      Object.keys(data).forEach((key) => {
        if (typeof data[key] == "string")
        data[key] = data[key].trim(); /*age string bud trim shodasho bzar to khodesh*/
      
      if (blackListData.includes(data[key])) delete data[key];

        if (Array.isArray(data[key]) && Array.length > 0)
          data[key] = data[key].map((item) => item.trim());


        if (nullishData.includes(data[key]))
          delete data[key]; /*data khali ro az tushun pak kon*/
      });
////////////////////////////////////////////////////////////////////
       const updateBlog = await BlogModel.updateOne({ _id:id},{$set:data},{new:true});
       if(updateBlog.modifiedCount == 0) throw createError.NotFound("بروز رسانی انجام نشد");
  
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: " بروز رسانی وبلاگ با موفقیت انجام شد ",
          updateBlog
        },
      });
    } catch (error) {
      deleteFileInPublic(req?.body?.image)
      next(error);
    }
  }
  async findBlog(id) {
    const blog = await BlogModel.findById(id).populate([
      { path: "category", select: "title" },
      {
        path: "author",
        select: ["mobile", "first_name", "last_name", "username"],
      },
    ]);
    if (!blog) throw createError.NotFound("بلاگ یافت نشد");
    return blog;
  }
}
module.exports = { AdminBlogController: new BlogController() };
