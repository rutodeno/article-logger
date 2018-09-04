let db = require("../models");
let scrape = require("../scripts/scrape");

module.exports = {

     scrapeHeadline :  (req, res) => {
        return scrape()
            .then(function (articles) {
                return db.Article.create(articles);
            })
            .then(function (dbArticles) {
                if (dbArticles.length === 0) {
                    res.json({
                        message: "No new articles today. Check back tomorrow"
                    })
                } else {
                    res.json({
                        message: `Added ${dbArticles.length} new articles !!`
                    })
                }
            })
            .catch(function (err) {
                res.json({
                    message: "Scrape complete !!"
                });
            });
    }

}