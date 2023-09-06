const { CategoryModel } = require("../../../models/categories");
const { addCategorySchema } = require("../../validators/admin/category.schema");
const Controller = require("../controller");
const createError = require("http-errors");

class CategoryController extends Controller {
  async addCategory(req, res, next) {
    try {
      // await addCategorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      const category = await CategoryModel.create({ title, parent });
      return res.status(201).json({
        statusCode: 201,
        message: "دسته بندی با موفقیت افزوده شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async removeCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await this.checkExistCategory(id);
      const deletResult = await CategoryModel.deleteOne(
        { _id: category._id },
        { new: true }
      );
      if (deletResult.deletedCount === 0) {
        throw createError.InternalServerError("خطای داخلی");
      }
      return res.status(200).json({
        data: deletResult,
        statusCode: 200,
        message: "دسته بندی با موفقیت پاک شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllCategory(req, res, next) {
    try {
      const category = await CategoryModel.aggregate([
        {
          $graphLookup: {
            from: "categories",
            startWith:"$_id",
            connectFromField: "_id",
            connectToField: "parent",
            maxDepth:5,
            depthField:"depth",
            as: "children",
          },
        },
        {
          $project: {
            __v: 0,
          },
        },
        {
          $match: { parent: undefined },
        },
      ]);
      return res.status(200).json({
        statusCode: 201,
        category,
        message: "دسته بندی با موفقیت فراخوانده شد",
      });
    } catch (error) {
      next(error);
    }
  }




  async getAllCategory1(req, res, next) {
    try {
      const category = await CategoryModel.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parent",
            as: "children",
          },
        },
        {
          $project: {
            __v: 0,
          },
        },
        {
          $match: { parent: undefined },
        },
      ]);
      return res.status(200).json({
        statusCode: 201,
        category,
        message: "دسته بندی با موفقیت فراخوانده شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllParentsCategory(req, res, next) {
    try {
      const parents = await CategoryModel.find({ parent: undefined });
      return res.status(200).json({
        statusCode: 200,
        parents,
        message: "دسته بندی با موفقیت فراخوانده شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async getChildOfParentCategory(req, res, next) {
    try {
      const { parent } = req.params;
      const children = await CategoryModel.find({ parent });
      return res.status(200).json({
        statusCode: 200,
        data: { children },
        message: "دسته بندی با موفقیت فراخوانده شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async checkExistCategory(id) {
    const category = await CategoryModel.findById(id);
    if (!category) {
      throw createError.NotFound("دسته بندی یافت نشد");
    }
    return category;
  }
}

module.exports = new CategoryController();
