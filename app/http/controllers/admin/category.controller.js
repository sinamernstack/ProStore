const { default: mongoose } = require("mongoose");
const { CategoryModel } = require("../../../models/categories");
const { addCategorySchema } = require("../../validators/admin/category.schema");
const Controller = require("../controller");
const createError = require("http-errors");
/**
 * @param {string} title
 * @param {number} parent
 * @returns {Object}
 */
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

  async editCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const category = await this.checkExistCategory(id);
      console.log(category);
      const resultOfUpdate = await CategoryModel.updateOne(
        { _id: id },
        { $set: { title: title } } // Use an object to specify the field to update
      );

      if (resultOfUpdate.modifiedCount === 0)
        throw createError.InternalServerError("بروز رسانی انجام نشد");
      return res.status(200).json({
        message: "بروز رسانی با موفقیت انجام شد",
        statusCode: 200,
      });
    } catch (error) {
      next(error);
    }
  }

  async removeCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await this.checkExistCategory(id);
      console.log(category._id.toString());
      const deletResult = await CategoryModel.deleteMany(
        {
          /**vase inke  ham parent ham childhash hazf shan ziba estefade az in option mongo shode*/
          $or: [
            {
              _id: category._id.toString(),
            },
            {
              parent: category._id.toString(),
            },
          ],
        },

        { new: true }
      );
      if (deletResult.deletedCount === 0) {
        throw createError.InternalServerError("خطای داخلی");
      }
      return res.status(200).json({
        data: deletResult,
        statusCode: 200,
        message: "دسته بندی همراه با زیر مجموعه ها با موفقیت پاک شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllCategory(req, res, next) {
    try {
      // const category = await CategoryModel.aggregate([
      //   {
      //     $graphLookup: {
      //       from: "categories",
      //       startWith: "$_id",
      //       connectFromField: "_id",
      //       connectToField: "parent",
      //       maxDepth: 5,
      //       depthField: "depth",
      //       as: "children",
      //     },
      //   },
      //   {
      //     $project: {
      //       __v: 0,
      //     },
      //   },
      //   {
      //     $match: { parent: undefined },
      //   },
      // ]);

      const categories = await CategoryModel.find({ parent: undefined });
      return res.status(200).json({
        statusCode: 201,
        categories,
        message: "دسته بندی با موفقیت فراخوانده شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req, res, next) {
    try {
      const { id: _id } = req.params;

      const category = await CategoryModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(_id) },
        },
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
      ]);
      return res.status(200).json({
        statusCode: 200,
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

  async getCategoryById1(req, res, next) {
    try {
      const { id } = req.params;

      try {
        const { id } = req.params;
        //  console.log(mongoose.Types.ObjectId(id))
        const category = await CategoryModel.findById(id)
          .populate("parent")
          .exec();

        return res.status(200).json({
          statusCode: 200,
          category,
          message: "دسته بندی با موفقیت فراخوانده شد",
        });
      } catch (error) {
        next(error);
      }

      return res.status(200).json({
        statusCode: 200,
        category,
        message: "دسته بندی با موفقیت فراخوانده شد",
      });
    } catch (error) {
      console.error("Error converting to ObjectId:", error);
    }
  }

  async checkExistCategory(id) {
    const category = await CategoryModel.findById(id);
    if (!category) {
      throw createError.NotFound("دسته بندی یافت نشد");
    }
    return category;
  }

  async getAlltCategoryWithoutPopulate(req, res, next) {
    try {
      const categories = await CategoryModel.aggregate([
        {
          $match: {},
        },
      ]);
      return res.status(200).json({
        categories,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
