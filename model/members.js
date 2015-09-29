var mongoose = require('mongoose');
var memberSchema = new mongoose.Schema({
	position: Number,
	name: String,
	title: String,
	picture: String,
	desc: String,
	mail: String,
	language: String,
	linkedin: String
});
mongoose.model('Member', memberSchema);
