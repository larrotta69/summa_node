var mongoose = require('mongoose');
var serviceSchema = new mongoose.Schema({
	position: Number,
	title: String,
	content: String,
	language: String,
	serviceList: [String]
});
mongoose.model('Service', serviceSchema);