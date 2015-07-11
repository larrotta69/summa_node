var express = require('express');
var router = express.Router();
var Account = require('../model/account');
var passport = require('passport');
var sendgrid  = require('sendgrid')('daniel_larrotta', 'sendgrid1969');

/* GET services page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', message: '' });
  console.log(req.user);
});

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login'});
  console.log(req.user);
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/?log=true');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.post('/mailer', function(req, res){
  var nombre = req.body.nombre,
      telefono = req.body.telefono,
      mensaje = req.body.mensaje;

  sendgrid.send({
    to:       'larrotta69@gmail.com',
    from:     'larrotta69@gmail.com',
    subject:  'Correo de summa-consultores',
    html:     '<h1>Correo </h1><br><p>Nombre: </p>'+nombre+'<br><p>Teléfono: </p>'+telefono+'<br><p>Mensaje: </p>'+mensaje
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
