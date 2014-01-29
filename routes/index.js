// Kaiseki
var db = require('../models/db');
var kaiseki = db.kaiseki;

// Test ejs
var ejs = require('ejs');
exports.helloworld = function(req, res){
   	res.render('helloworld.ejs', {name:req.param('name')});
}

exports.helloworld_result = function(req, res) {
	res.render('helloworld_result.ejs', {classroom:req.body.classroom, password:req.body.password});
}