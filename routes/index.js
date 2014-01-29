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

exports.joinroom = function(req, res) {
	res.render('joinroom.ejs');
}

exports.joinroom_result = function(req, res) {
	// get from database
	res.render('joinroom_result.ejs', {roomname:req.body.roomname});
}

exports.newroom = function(req, res) {
	res.render('newroom.ejs');
}

exports.newroom_result = function(req, res) {
	// save in database
	res.render('newroom_result.ejs', {roomname:req.body.roomname});
}