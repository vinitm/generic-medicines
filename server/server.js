var express = require('express');
var suggestions = require('./suggestions.js');
var alternatives = require('./alternatives.js');
var details = require('./details.js');
var background=require('./background.js');
var app = express();


var root = __dirname + "/../";

app.use(express.static(root + '/public'));

app.get('/bing_background', function (req, res) {
    background().then(function (data) {
        res.end(JSON.stringify(data));
    });
});

app.get('/medicine_suggestions', function (req, res) {
    suggestions(req.query.id).then(function (data) {
        res.end(JSON.stringify(data));
    });
});

app.get('/medicine_substitutes', function (req, res) {
    alternatives(req.query.id).then(function (data) {
        res.end(JSON.stringify(data));
    });
});

app.get('/medicine_details', function (req, res) {
    details(req.query.id).then(function (data) {
        res.end(JSON.stringify(data));
    });
});


app.listen(8000);