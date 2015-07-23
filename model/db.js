var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:22550/summadb');
//mongoose.connect('mongodb://web428.webfaction.com:22550/summadb');
//mongoose.connect('mongodb://localhost:27017/summadb');

mongoose.connect("mongodb://summaUserAdmin:1234567@localhost:22550/summadb");
	var db = mongoose.connection;
	db.once('open', function () {
		console.log('MongoDB connection successful.'+ db);
<<<<<<< HEAD
});
=======
});
>>>>>>> 92ce662721e5b4dc103ce13e5ed8b08df99e6618
