var express = require('express');
var compress = require('compression');
var app = express();
var Suggestions = require('./controllers/suggestions');
var Details = require('./controllers/details');
var db = require('./db');
var config = require('./config');

var oneDay = 86400000;
var root = __dirname + "/../";


function send(res, data) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
}

db.connect();

app.use(compress());
app.use( /*'/medicines/*',*/ express.static(root + '/dist', {
    maxAge: oneDay
}));

app.use('/bootstrap', express.static(root + '/node_modules/bootstrap/dist', {
    maxAge: oneDay
}));

app.use('/font-awesome', express.static(root + '/node_modules/font-awesome', {
    maxAge: oneDay
}));

/*app.all('/*', function (req, res) {
console.log(req.path);
});*/

app.get('/medicine_suggestions', function (req, res) {
    Suggestions.get(req.query.id).then(function (data) {
        send(res, data);
    });
});

app.get('/medicine_details', function (req, res) {
    Details.get(req.query.id).then(function (data) {
        send(res, data);
    });
});

app.listen(config.port);
console.log('listening on ' + config.port);