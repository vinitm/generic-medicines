var alternatives = require('./endpoints/alternatives.js');
var details = require('./endpoints/details.js');

var parse = function (obj) {
    return {
        details: JSON.parse(obj[0]).response,
        alternatives: JSON.parse(obj[1]).response.medicine_alternatives
    };
};

module.exports = function (query) {
    var alternativesPromise = alternatives(query);
    var detailsPromise = details(query);
    return Promise.all([detailsPromise, alternativesPromise]).then(function (res) {
        return parse(res);
    });
};