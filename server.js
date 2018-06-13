// packages to be used.
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models"); // database
var PORT = 8080  // check documentation



// objective
// 1. scrap desiring God
// 2. Saved articles on MongoDB
// 3. Implement a wat to have notes on it


var app = express();
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/articleLogger");

app.get("/scrapps", function (req, res) {
    axios.get("https://www.desiringgod.org/resources/all")
        .then(function (response) {
            var $ = cheerio.load(response.data);

            $(".card--resource").each(function (i, element) {
                var result = {};

                result.title = $(this)
                    .children("a")
                    .find("h2")
                    .text();
                result.link = $(this)
                    .children("a.card__shadow")
                    .attr("href");

                result.author = $(this)
                    .children("a")
                    .find(".card__author")
                    .text()

               // console.log(result);

                // saving results to our database
                db.Article.create(result)
                    .then(function (dbArticles) {
                        console.log(dbArticles);
                    })
                    .catch(function (err) {
                        return res.json(err);
                    })

            })

            res.send("Scrapping Complete. Articles saved to DB");
        })
})

/*
app.get("/allarticles", function(req, res) {
    db.Article.find({})
    .then(function(dbArticles) {
        res.json(dbArticles);
    })
    .catch(function(err) {
        res.json(err);
    });
});

*/



app.listen(PORT, function() {
    console.log("App running on port "+PORT);
})





