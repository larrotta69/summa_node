var express = require('express'),
router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST
    /*mine*/

    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(methodOverride(function(req, res){
    	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method;
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

	//retrieve data from mongo
		var MemberCallback = function(error, members){
			if (error)
				return console.error(error);
			else{
				response.format({
					//Render index in views/members. Send the member variable to jade template
					html: function(){
						if ( lang === 'es' || lang === 'ca' || lang === 'en'){
							var obj = {};
							if (request.user === undefined){
								obj = { title: 'Index for members', members: members, language: lang };
							}
							else{
								obj = { title: 'Index for members', members: members, language: lang, logueado: true };
							}
							response.render('members/index', obj);
						}
						else 
							next();
					},
					json: function(){
						response.json(members);
					}
				});
			}
		};
    mongoose.model('Member').find({language: request.lang}).sort('position').exec(MemberCallback);  

});

    router.post('/', function(req, res) {
    // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
    var name = req.body.name;
    var title = req.body.title;
    var picture = req.body.picture;
    var mail = req.body.mail;
    var position = req.body.position;
    var language = req.body.language;
    var linkedin = req.body.linkedin;
    var desc = req.body.desc;

    //call the create function for our database
    if (req.user === undefined){
    	res.sendStatus(404);
    }
    else{
    	mongoose.model('Member').create({
    		name : name,
    		title : title,
    		mail : mail,
    		linkedin : linkedin,
    		picture : picture,
    		position : position,
    		language : language,
    		desc : desc
    	}, function (err, member) {
    		if (err) {
    			res.send("There was a problem adding the member to the database.");
    		} 
    		else {
              //member has been created
              console.log('POST creating new member: ' + member);
              res.format({
                  //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                  html: function(){
                    // If it worked, set the header so the address bar doesn't still say /adduser
                    res.location("equipo");
                    // And forward to success page
                    res.redirect("/equipo/es");
                },
                //JSON response will show the newly created blob
                json: function(){
                	res.json(member);
                }
            });
          }
      })
}
});

/* GET New Member page. */
router.get('/new', function(req, res) {
	if (req.user === undefined){
		res.render('404', {title: '404: File Not Found'});
	}
	else{
		res.render('members/new', { title: 'Add New Member' });
	}
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    if (req.user === undefined){
    	res.render('404', {title: '404: Member Not Found'});
    }
    else{
    	mongoose.model('Member').findById(id, function (err, member) {
        //if it isn't found, we are going to repond with 404
        if (err) {
        	console.log(id + ' was not found');
        	res.status(404);
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
            console.log(member);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next();
        }
    });
    }
});

router.route('/:id')
.get(function(req, res){

	mongoose.model('Member').findById(req.id, function(error, member){
		if (error)
			console.log('Problem retrieving a member by their ID'+ error );
		else{
			console.log('Retrieving member from DB by ID'+ member._id);
			res.format({
				html: function(){
					res.render('members/show', {
						title : "Mostrando un miembro del equipo",
						member : member
					});
				},
				json: function(){
					res.json(member);
				}
			});
		}
	});
});
//Render the view for Edit by ID
router.get('/:id/edit', function(req, res){
	mongoose.model('Member').findById(req.id, function(error, member){
		if (error)
			console.log('Error retrieving the member '+ error);
		else{
			res.format({
				html: function(){
					res.render('members/edit',{
						title: 'Miembro número '+ member._id,
						member: member
					});
				},
				json: function(){
					res.json(member);
				}
			})
		}
	});
});

//Put to DB for Edit by ID
router.put('/:id/edit', function(req, res){
	var name = req.body.name;
	var title = req.body.title;
	var picture = req.body.picture;
	var mail = req.body.mail;
	var position = req.body.position;
	var language = req.body.language;
	var linkedin = req.body.linkedin;
	var desc = req.body.desc;

	mongoose.model('Member').findById(req.id, function(error, member){
		member.update({
			name: name,
			title: title,
			picture: picture,
			mail: mail,
			linkedin: linkedin,
			position: position,
			language: language,
			desc: desc
		}, function(error, memberID){
			if (error)
				res.send('Error in database updating from PUT member');
			else {
				res.format({
					html: function(){
						res.redirect('/equipo/'+member._id);
					},
					json: function(){
						res.json(member);
					}
				});
			}
		});
	});
});

router.delete('/:id/edit', function(req, res){
	mongoose.model('Member').findById(req.id, function(error, member){
		if (error) {
			return console.error(err);
		}
		else{
			member.remove(function(error, member){
				if (error)
					return console.error(error);
				else{
					console.log('DELETE removing ID: ' + member._id);
					res.format({
						html: function(){
							res.redirect('/equipo');
						},
						json: function(){
							res.json(member);
						}
					});
				}
			});
		}
	});
});



module.exports = router;
