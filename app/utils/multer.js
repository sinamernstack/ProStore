const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createError = require("http-errors");
function createRoute(req) {
  const date = new Date();
  const year = new Date().getFullYear().toString();
  const month = new Date().getMonth().toString();
  const day = new Date().getDay().toString();
  const directory = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    "blogs",
    year,
    month,
    day
  );
  req.body.fileUploadPath = path.join("uploads", "blogs", year, month, day);
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file?.originalname) {
      const filePath = createRoute(req);
      return cb(null, filePath);
    }
    cb(null, null);
  },
  filename: (req, file, cb) => {
    if (file.originalname) {
      const ext = path.extname(file.originalname);
      const filename = String(new Date().getTime() + ext);
      req.body.filename = filename;
      return cb(null, filename);
    }
    cb(null, null);
  },
});
function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname);
  const mimetypes = [".jpeg", ".jpg", ".png", ".gif"];
  if (mimetypes.includes(ext)) {
    return cb(null, true);
  }
  return cb(createError.BadRequest("فرمت ارسال شده صحیح نمی باشد"));
}
const maxSize = 1 * 1000 * 1000;
const uploadFile = multer({
  storage,
  limits: { fileSize: maxSize },
  fileFilter,
});

module.exports = { uploadFile };
