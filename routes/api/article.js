let router = require("express").Router();
let articleController = require("../../controllers/article");

router.get("/", articleController.findAll);
router.delete("/:id", articleController.delete);
router.put("/:id", articleController.update);

module.exports = router;