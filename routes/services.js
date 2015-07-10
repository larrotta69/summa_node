var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}));

router.route('/')
	.get(function(request, response, next){
		//retrieve data from mongo
		mongoose.model('Service').find({}, function(error, services){
			if (error)
				return console.error(error);
			else{
				response.format({
					//Render index in services/index. Send the service variable to jade template
					html: function(){
						response.render('services/index', {
							title: 'Index for services',
							services: services
						});
					},
					json: function(){
						response.json(services);
					}
				});
			}
		});
	})

	.post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var title = req.body.title;
        var content = req.body.content;
        var serviceList = req.body.serviceList.split(',');

        console.log(title, content, serviceList);
        //call the create function for our database
				if (req.user === undefined)
					res.sendStatus(404);
				else {
        	mongoose.model('Service').create({
            title : title,
            content : content,
            serviceList : serviceList
        	}, function (err, service) {
              if (err) {
                  res.send("There was a problem adding the service to the database.");
              } else {
                  //service has been created
                  console.log('POST creating new service: ' + service);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("servicios");
                        // And forward to success page
                        res.redirect("/servicios");
                    },
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(service);
                    }
                });
              }
        })
				}
    });

/* GET New Member page. */
router.get('/new', function(req, res) {
		if (req.user === undefined)
      res.render('404', {title: '404: File Not Found'});
		else
				res.render('services/new', { title: 'Add New Service' });


});

module.exports = router;
