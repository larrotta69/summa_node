var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST
/*mine*/
var passport = require('../auth');

router.use(passport.initialize());
router.use(passport.session());

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
		mongoose.model('Member').find({}, function(error, members){
			if (error)
				return console.error(error);
			else{
				response.format({
					//Render index in views/members. Send the member variable to jade template
					html: function(){
						response.render('members/index', {
							title: 'Index for members',
							members: members
						});
					},
					json: function(){
						response.json(members);
					}
				});
			}
		});
	})

	.post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var name = req.body.name;
        var title = req.body.title;
        var picture = req.body.picture;
        var desc = req.body.desc;

        //call the create function for our database
        if (req.user === undefined){
          mongoose.model('Member').create({
            name : name,
            title : title,
            picture : picture,
            desc : desc
        }, function (err, member) {
              if (err) {
                  res.send("There was a problem adding the member to the database.");
              } else {
                  //member has been created
                  console.log('POST creating new member: ' + member);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("equipo");
                        // And forward to success page
                        res.redirect("/equipo");
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
    res.redirect('/');
  }
  else{
      res.render('members/new', { title: 'Add New Member' });
  }
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Member').findById(id, function (err, blob) {
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
            //console.log(blob);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next();
        }
    });
});

router.route('/:id')
	.get(function(req, res){
		mongoose.model('Member').findById(req.id, function(error, member){
			if (error)
				console.log('Problem retrieving a member by their ID'+ error );
			else{
				console.log('Retrieving memeber from DB by ID'+ member._id);
				res.format({
					html: function(){
						res.render('members/show', {
							title : "Show a member",
							da : member
						});
					},
					json: function(){
						res.json(member);
					}
				});
			}
		});
	});



module.exports = router;
