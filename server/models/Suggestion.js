var mongoose = require('mongoose');

var SuggestionSchema = mongoose.Schema({
    suggestion: String
}, {
    _id: false,
    id: false
});

module.exports = mongoose.model('medicine', SuggestionSchema);