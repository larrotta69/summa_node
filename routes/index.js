var express = require('express');
var router = express.Router();
var Account = require('../model/account');
var passport = require('passport');
var sendgrid  = require('sendgrid')('daniel_larrotta', 'sendgrid1969');

/* GET services page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', message: 'de' });
});

router.get('/condiciones', function(req, res, next) {
  res.render('condiciones', { title: 'Condiciones' });
});

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login'});
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/?log=true');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

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
router.route('/:lang').get(function(req, res, next){
    var lang = req.lang; 
    
    if ( lang === 'es' || lang === 'ca' || lang === 'en')
        res.render('index', { title: 'Home', message: lang });
    else
        next();

});

router.post('/mailer', function(req, res){
  var nombre = req.body.nombre,
  mail = req.body.mail,
  mensaje = req.body.mensaje;

  sendgrid.send({
    to:       ['aprim@summa-consultores.com', 'ejaramillo@summa-consultores.com', 'larrotta69@gmail.com'],
    from:     'ejaramillo@summa-consultores.com',
    subject:  'Correo de summa-consultores',
    html:     '<h1>Correo </h1><br><p>Nombre: </p>'+nombre+'<br><p>Correo: </p>'+mail+'<br><p>Mensaje: </p>'+mensaje
}, function(err, json) {
    if (err) { return console.error(err); }
    console.log(json);
    res.redirect('/?send=true');
});
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
