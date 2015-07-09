var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

/* GET services page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(req.session.passport.user);
});

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login'});
});

router.post('/login', passport.authenticate('local'), function(req, res){
      res.redirect('/');
      console.log(req.user);
});

module.exports = router;
