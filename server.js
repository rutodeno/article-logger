// packages to be used.
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var axios = require("axios");
var PORT = process.env.PORT || 8080  // check documentation

var app = express();

var routes = require("./routes"); 

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));

app.use(routes);

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

app.listen(PORT, function() {
    console.log("App running on port " + PORT);
})
