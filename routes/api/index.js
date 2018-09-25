let router = require("express").Router();
let fetchRoutes = require("./fetch");
let noteRoutes = require("./note");
let articleRoutes = require("./article");

router.use("/fetch", fetchRoutes);
router.use("/note", noteRoutes);
router.use("/article", articleRoutes);

module.exports = router;