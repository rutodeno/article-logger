let router = require("express").Router();
let apiRoutes = require("./api");
let viewRoutes = require("./view");

router.use("/api", apiRoutes);
router.use("/", viewRoutes);

module.exports = router;