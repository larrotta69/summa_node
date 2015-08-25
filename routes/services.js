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

router.param('lang', function(req, res, next, lang) {
    if (err) {
        console.log(id + ' was not found');
        res.status(404);
        var err = new Error('Not Found');
        err.status = 404;
    } else {
        console.log(lang);
        req.lang = lang;
        next();
    }
});

router.route('/:lang').get(function(request, response, next){
    var lang = request.lang; 


        var ServiceCallback = function(error, services){
            if (error)
                return console.error(error);
            else{
                response.format({
                    //Render index in services/index. Send the service variable to jade template
                    html: function(){
                        if ( lang === 'es' || lang === 'ca' || lang === 'en'){
                            var obj = {};
                            if (request.user === undefined){
                              obj = { title: 'Index for services', services: services, language: lang };
                            }
                            else{
                              obj = { title: 'Index for members', services: services, language: lang, logueado: true };
                            }
                            response.render('services/index', obj);
                        }
                        else 
                            next();
                    },
                    json: function(){
                        response.json(services);
                    }
                });
            }
        };

    mongoose.model('Service').find({language: request.lang}).sort('position').exec(ServiceCallback);  
    
});
	

router.post('/', function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var title = req.body.title;
        var content = req.body.content;
        var position = req.body.position;
        var language = req.body.language;
        var serviceList = req.body.serviceList.split(',');

        console.log(title, content, serviceList);
        //call the create function for our database
		if (req.user === undefined)
			res.sendStatus(404);
		else {
            mongoose.model('Service').create({
                title : title,
                content : content,
                position : position,
                language : language,
                serviceList : serviceList
                }, function (err, service) {
                    if (err) {
                      res.send("There was a problem adding the service to the database.");
                    } 
                    else {
                      //service has been created
                      console.log('POST creating new service: ' + service);
                      res.format({
                          //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                        html: function(){
                            // If it worked, set the header so the address bar doesn't still say /adduser
                            res.location("servicios");
                            // And forward to success page
                            res.redirect("/servicios/es");
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

/* GET New Service page. */
router.get('/new', function(req, res) {
		if (req.user === undefined)
      res.render('404', {title: '404: File Not Found'});
		else
			res.render('services/new', { title: 'Agregar un servicio' });
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    if (req.user === undefined){
      res.render('404', {title: '404: Service Not Found'});
    }
    else{
      mongoose.model('Service').findById(id, function (err, service) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        //if it is found we continue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(service);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next();
        }
      });
    }
});

//Get by ID
router.route('/:id')
			.get(function(req, res){
				mongoose.model('Service').findById(req.id, function(error, service){
					if (error)
						console.log('Problem retrieving a service by their ID'+ error );
					else{
						console.log('Retrieving service from DB by ID'+ service._id);
						res.format({
							html: function(){
								res.render('services/show', {
									title : "Mostrando el servicio",
									service : service
								});
							},
							json: function(){
								res.json(service);
							}
						});
					}
				});
			});

//Render the view for Edit by ID
router.get('/:id/edit', function(req, res){
	mongoose.model('Service').findById(req.id, function(error, service){
		if (error)
			console.log('Error retrieving the service '+ error);
		else{
			res.format({
				html: function(){
					res.render('services/edit',{
						title: 'Servicio número '+ service._id,
						service: service
					});
				},
				json: function(){
					res.json(service);
				}
			})
		}
	});
});

//Put to DB for Edit by ID
router.put('/:id/edit', function(req, res){
	var title = req.body.title;
	var content = req.body.content;
    var position = req.body.position;
    var language = req.body.language;
	var serviceList = req.body.serviceList.split(',');

	mongoose.model('Service').findById(req.id, function(error, service){
		service.update({
			title: title,
			content: content,
            position: position,
            language: language,
			serviceList: serviceList
		}, function(error, serviceID){
			if (error)
				res.send('Error in database updating from PUT service');
			else {
				res.format({
					html: function(){
						res.redirect('/servicios/'+service._id);
					},
					json: function(){
						res.json(service);
					}
				});
			}
		});
	});
});

router.delete('/:id/edit', function(req, res){
    mongoose.model('Service').findById(req.id, function(error, service){
        if (error) {
            return console.error(err);
        }
        else{
            service.remove(function(error, service){
                if (error)
                    return console.error(error);
                else{
                    console.log('DELETE removing ID: ' + service._id);
                    res.format({
                        html: function(){
                            res.redirect('/servicios');
                        },
                        json: function(){
                            res.json(service);
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;
