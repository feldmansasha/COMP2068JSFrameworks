var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Alex Feldman" });
});

router.get('/about', function(req, res, next){
  res.render('about', {title:'About me'});
})

router.get('/projects', function(req, res, next){
  res.render('projects', {title: "Alex's projects"});
})

router.get('/contact', function(req, res, next){
  res.render('contact', {title:'Contact me'});
})

module.exports = router;