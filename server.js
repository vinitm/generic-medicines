var request = require('request');
var express = require('express');
var app = express();
var urlSuggestions = "http://www.truemd.in/api/medicine_suggestions/";
var urlAlternatives = "http://www.truemd.in/api/medicine_alternatives/";
var urlDetails = "http://www.truemd.in/api/medicine_details/";
var key = "23ea9fe5835a70041031ba3642f476";


var constructURL = function (domainURL, keyword) {
    var url = domainURL + '?id=' + encodeURIComponent(keyword) + '&key=' + key;
    return url;
};

var getDetails = function (keyword) {
    return new Promise(function (resolve, reject) {
        var url = constructURL(urlDetails, keyword);
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
};


var getAlternatives = function (keyword) {
    return new Promise(function (resolve, reject) {
        var url = constructURL(urlAlternatives, keyword);
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
};


var getSuggestions = function (keyword) {
    return new Promise(function (resolve, reject) {
        var url = constructURL(urlSuggestions, keyword);
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
};

app.use(express.static(__dirname + '/site'));
app.get('/medicine_suggestions', function (req, res) {
    getSuggestions(req.query.id).then(function (data) {
        var model = JSON.parse(data).response.suggestions;
        res.end(JSON.stringify(model));
    });
});

app.get('/medicine_alternatives', function (req, res) {
    console.log(req.query.id);
    getAlternatives(req.query.id).then(function (data) {
        var model = JSON.parse(data).response.medicine_alternatives;
        res.end(JSON.stringify(model));
    });
});

app.get('/medicine_details', function (req, res) {
    getDetails(req.query.id).then(function (data) {
        var model = JSON.parse(data).response;
        res.end(JSON.stringify(model));
    });
});


app.listen(8000);