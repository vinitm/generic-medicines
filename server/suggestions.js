var suggestions = require('./endpoints/suggestions.js');

var parse = function (jsonStr) {
    var obj = JSON.parse(jsonStr);
    return obj.response.suggestions;
};

module.exports = function (query) {
    var suggestionsPromise = suggestions(query);
    return suggestionsPromise.then(function (res) {
        return parse(res);
    });
};