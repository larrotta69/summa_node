var express = require('express');
var router = express.Router();
var Account = require('../model/account');
var passport = require('passport');

/* GET services page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(req.user);
});

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login'});
  console.log(req.user);
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
/*
router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});
*/
module.exports = router;
