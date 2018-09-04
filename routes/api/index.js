let router = require("express").Router();
let fetchRoutes = require("./fetch");
let noteRoutes = require("./note");
let articleRoutes = require("./article");

router.use("/fetch", fetchRoutes);
router.use("/notes", noteRoutes);
router.use("/articles", articleRoutes);

module.exports = router;