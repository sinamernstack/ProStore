const path = require("path");
const { ProductModel } = require("../../../models/products");
const {
  deleteFileInPublic,
  listOFImageFromRequest,
} = require("../../../utils/functions");
const {
  createProductSchema,
} = require("../../validators/admin/product.schema");
const Controller = require("../controller");
const {
  ObjectIdValidator,
} = require("../../validators/public/publicValidator");
const createError = require("http-errors");
const HttpStatus = require("http-status-code");

class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      const image = listOFImageFromRequest(req?.files, req.body.fileUploadPath);
      const productBody = await createProductSchema.validateAsync(req.body);

      const {
        title,
        text,
        short_text,
        tags,
        category,
        count,
        discount,
        price,
      } = productBody;
      const supplier = await req.user._id;
      const product = await ProductModel.create({
        title,
        text,
        short_text,
        tags,
        category,
        count,
        discount,
        price,
        image,
        supplier,
      });
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "محصول با موفقیت ساخته شد",
          product,
        },
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      next(error);
    }
  }

  async editProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async removeProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProduct(id);
      const deletedProduct = await ProductModel.deleteOne({ _id: product._id });
      if (!deletedProduct)
        throw createError.InternalServerError("product not found");

      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "محصول با موفقیت پاک شد",
          deletedProduct,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(req, res, next) {
    try {
      const search = req?.query?.search || "";
let products
      if (search) {
        products = await ProductModel.find({
          $or: [
            { title: { $regex: search, $options: "i" } },
            { text: { $regex: search, $options: "i" } },
          ],
        });
      }
      else{ products = await ProductModel.find({});}

      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "لیست همه محصولات",
          products,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getOneProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProduct(id);
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "محصول یافت شد",
          product,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async findProduct(ProductId) {
    try {
      const { id } = await ObjectIdValidator.validateAsync({ id: ProductId });
      const product = await ProductModel.findById(id);
      if (!product) {
        throw createError.NotFound("محصول یافت نشد");
      }
      return product;
    } catch (error) {
      next(error);
    }
  }
}
module.exports = {
  ProductController: new ProductController(),
};
