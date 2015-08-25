var express = require('express');
var router = express.Router();

/* GET services page. */


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
        res.render('contact', { title: 'Contact', language: lang });
    else
        next();

});

module.exports = router;
