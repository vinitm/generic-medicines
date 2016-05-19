var Suggestion = require('../models/Suggestion');
var helpers = require('../helpers');
/*
[{
    "suggestion": "10 PM (25 mg)"
}]
*/

var Suggestions = function () {

    var options = {
        limit: 50
    };

    this.get = function (keyword) {
        keyword = helpers.escapeRegExp(keyword);
        var query = new RegExp("^" + keyword, 'i');
        return Suggestion.find({
            suggestion: {
                $regex: query
            }
        }, '-_id suggestion').limit(options.limit);
    };

};


module.exports = new Suggestions();