// packages to be used.
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models"); // database
var PORT = process.env.PORT || 8080  // check documentation


var app = express();

var router = express.Router(); // not sure how to use this
require("./config/routes")(router);

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));

app.use(router);

app.set("view engine", "handlebars");


var connectDB = process.env.MONGODB_URI || "mongodb://localhost/articleLogger" ; 
mongoose.Promise = Promise;
mongoose.connect(connectDB, function(err) { // checking connection
    if(err) {
        console.log(err);
    }
    else {
        console.log("mongoose connection succesful");
    }
});

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


app.get("/allarticles", function(req, res) {
    db.Article.find({})
    .then(function(dbArticles) {
        res.json(dbArticles);
    })
    .catch(function(err) {
        res.json(err);
    });
});

app.get("/allarticles/:id", function(req,res) {
    db.Article.find({_id: req.params.id})
    .populate("note")
    .then(function(newNote) {
        res.json(newNote);
    })
    .catch(function(err) {
        res.json(err)
    })
})

app.delete("/allarticles/:id", function(req,res) {
    db.Article.findOneAndRemove({_id: req.params.id})
    .then(function(deletedArticle) {
        res.json(deletedArticle)
    })
    .catch(function(err) {
        res.json(err);
    })
})

// posting Note
app.post("/allarticles/:id", function(req,res) {
    db.Note.create(req.body)
    .then(function() {
        return db.Article.findOneAndUpdate({_id:red.params.id}, {note:dbNote._id}, {new: true})
    })
    .then(function(data) {
        res.json(data);
    })
    .catch(function(err) {
        res.json(err);
    })
})


app.listen(PORT, function() {
    console.log("App running on port "+PORT);
})





