const { HomeRoutes } = require("./api");
const { UserAuth } = require("./user/auth");

const router = require("express").Router();

router.use("/", HomeRoutes);
router.use("/login",UserAuth)
module.exports = {
  AllRoutes: router,
};
