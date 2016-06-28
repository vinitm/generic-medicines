var mongoose = require('mongoose');
var config = require('./config');

var db = mongoose.connection;


db.on('error', function (err) {
    console.log(err);
    connect();
});

db.on('disconnected', function () {
    console.log('disconnected');
});
db.on('open', function () {
    console.log('open');
});

function connect() {
    if (db.readyState === 0) {
        mongoose.connect(config.dbPath, {
            server: {
                reconnectTries: Number.MAX_VALUE
            }
        });
    }
}

exports.connect = connect;