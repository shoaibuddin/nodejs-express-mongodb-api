var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StudentsSchema   = new Schema({
	name: String
});

module.exports = mongoose.model('Students', StudentsSchema);