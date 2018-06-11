// packages to be used.
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models"); // database
var PORT = 8080 || process.argv; // check documentation



// objective
// 1. scrap desiring God
// 2. Saved articles on MongoDB
// 3. Implement a wat to have notes on it


var app = express();
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/articleLogger");

//app.get ("/articles", function(req,res) {
    axios.get("https://www.desiringgod.org/")
    .then(function(response) {
        var $ = cheerio.load(response.data);

        $(".card--resource").each(function(i, element) {
            var result = {};

            result.title = $(this)
                .children("h2")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            console.log(result);
        })
    })
//})

