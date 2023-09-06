const { redisClient } = require("../utils/init_redis");
const { HomeRoutes } = require("./api");
const { UserAuth } = require("./user/auth");
const { DeveloperRoutes } = require("./developer/developer.routes");
const { AdminRoutes } = require("./admin/admin.routes");
(async () => {
  await redisClient.set("key", "DS");
  const value = await redisClient.get("key");
  console.log(value);
})();
const router = require("express").Router();
router.use("/", HomeRoutes);
router.use("/admin",AdminRoutes)
router.use("/login", UserAuth);
router.use("/developer", DeveloperRoutes);
module.exports = {
  AllRoutes: router,
};
