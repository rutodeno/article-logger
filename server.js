// packages to be used.
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");
var PORT = 8080 || process.argv; // check documentation



// objective
// 1. scrap desiring God
// 2. Saved articles on MongoDB
// 3. Implement a wat to have notes on it


