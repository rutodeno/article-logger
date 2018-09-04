let router = require("express").Router();
let fetchController = require("../../controllers/fetch");

router.get("/", fetchController.scrapeHeadline);

module.exports = router;