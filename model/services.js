var mongoose = require('mongoose');
var serviceSchema = new mongoose.Schema({
	title: String,
	content: String,
	serviceList: [String]
});
mongoose.model('Service', serviceSchema);