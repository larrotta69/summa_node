var mongoose = require('mongoose');
var memberSchema = new mongoose.Schema({
	name: String,
	title: String,
	picture: String,
	desc: String,
	mail: String,
	linkedin: String
});
mongoose.model('Member', memberSchema);
