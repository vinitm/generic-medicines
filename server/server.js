var express = require('express');
var compress = require('compression');
var app = express();
var suggestions = require('./suggestions.js');
var details = require('./details.js');


var root = __dirname + "/../";


function send(res, data) {
    res.end(JSON.stringify(data));
}

app.use(compress());
app.use(express.static(root + '/dist'));

app.get('/medicine_suggestions', function(req, res) {
    suggestions(req.query.id).then(function(data) {
        send(res, data);
    });
});

app.get('/medicine_details', function(req, res) {
    details(req.query.id).then(function(data) {
        send(res, data);
    });
});

app.listen(8000);
