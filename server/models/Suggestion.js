var mongoose = require('mongoose');

var SuggestionSchema = mongoose.Schema({
    suggestion: {
        type: String
    }
});

module.exports = mongoose.model('medicine', SuggestionSchema);