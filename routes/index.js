// Mongo
var Schema = require('../schemas/room');

// Test ejs
var ejs = require('ejs');

/*
exports.helloworld = function(req, res){
   	res.render('helloworld.ejs', {name:req.param('name')});
}

exports.helloworld_result = function(req, res) {
	res.render('helloworld_result.ejs', {classroom:req.body.classroom, password:req.body.password});
}
*/

exports.joinroom = function(req, res) {
	res.render('joinroom.ejs');
}

exports.joinroom_result = function(req, res) {
	// get from database
	Schema.find({ roomname: req.body.roomname }, function (err, docs) {
  		if (err) {
  			console.log(err);
			res.status(500).json({status: 'fail'});
  		} else {
  			var object = docs;
  			if (docs.length == 0){
  				console.log('room doesn\'t exist');
  				res.render('joinroom.ejs');
  			} else {
  				res.render('joinroom_result.ejs', {roomname:req.body.roomname});
  			}
  		}
	});
}

exports.newroom = function(req, res) {
	res.render('newroom.ejs');
}

exports.newroom_result = function(req, res) {
	// save in database
	var Room = new Schema({
		roomname: req.body.roomname,
		password: req.body.password,
		author: req.body.author
	});

	Schema.find({ roomname: req.body.roomname}, function (err, docs) {
		if (err) {
			console.log(err);
			res.status(500).json({status: 'fail'});
		} else  {
			if (docs.length == 0) {
  				Room.save(function (err, product, numberAffected) {
  					if (err) {
  						console.log(err);
  						res.status(500).json({status: 'fail'});
  					} else {
  						console.log('success!');
  					}
				});

				res.render('newroom_result.ejs', {roomname:req.body.roomname});
  			} else {
  				console.log(docs);
  				console.log('this roomname already exists');
  				res.render('newroom.ejs');
  			}
  		}
	});

	

	
}