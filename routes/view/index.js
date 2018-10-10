let router = require("express").Router();

router.get("/", function(req, res) {
    res.render("home");
});

router.get("/saved", function(req, res) {
    res.render("saved");
})

router.get("/aboutUs", function(req, res) {
    res.render("aboutUs");
})
module.exports =  router;