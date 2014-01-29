// Kaiseki - Parse
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

// Handle server-side error
var handleError = function() {
	res.status(500);
}
// Log error messages
var logError = function(errorMessage) {
	console.log(errorMessage);		
}

/*
 * Exported functions
 */
exports.joinroom = function(req, res) {
	res.render('joinroom.ejs');
}

exports.joinroom_result = function(req, res) {
	// get from database
	// set up class name
	var className = 'room';
	// search for room
	var params = {
		where: {roomname: req.body.roomname},
		order: '-roomname',
		count: true
	};

	kaiseki.getObjects(className, params, function(err, result, body, success) {
		if (!success) {
			handleError();
			return;
		}
		if (body.count == 0) {
			logError("Room does not exist");
			res.render('joinroom.ejs');
			return;
		}
		if(body.results[0].password != req.body.password) {
			logError("Incorrect password");
			res.render('joinroom.ejs');
			return;
		}
		res.render('joinroom_result.ejs', {roomname:req.body.roomname});
	});
}

exports.newroom = function(req, res) {
	res.render('newroom.ejs');
}

exports.newroom_result = function(req, res) {
	// save in database
	// set up classname
	var className = 'room';	
	// search for room
	var params = {
		where: {roomname: req.body.roomname},
		order: '-roomname'
	};
	kaiseki.countObjects(className, params, function(err, result, body, success) {
		if (!success) {
			handleError();
			return;
		}
		if (body.count > 0) {
			logError("Room already exists");
			res.render('newroom.ejs');
			return;
		}
		// Create new room
		var room = {
			roomname: req.body.roomname,
			password: req.body.password,
			author: req.body.author
		};
		kaiseki.createObject(className, room, function(err, result, body, success) {
			if (!success) {
				handleError();
				return;
			}
			console.log('object created = ', body);
			console.log('object id = ', body.objectId);
		});
		res.render('newroom_result.ejs', {roomname:req.body.roomname});
	});
}