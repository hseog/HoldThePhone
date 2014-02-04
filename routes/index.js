// Mongo
var Schema = require('../schemas/room');

// Test ejs
var ejs = require('ejs');

//cookies
//var express = require("express");
//var app = express();
//cookies with express
//app.use(express.cookieParser());
//app.use(express.session({secret: '1234567890QWERTY'}));


exports.joinroom = function(req, res) {
	res.render('joinroom.ejs', {isRoomError: false, isPasswordError: false});
}

exports.joinroom_result = function(req, res) {
	// get from database
	Schema.find({ roomname: req.body.roomname }, function (err, docs) {
		if (err) {
			console.log(err);
			res.status(500).json({status: 'fail'});
			return;
		} 

		if (docs.length == 0){
			console.log('room doesn\'t exist');
			//errorMessage='room doesn\'t exist';
			res.render('joinroom.ejs', {isRoomError: true, isPasswordError: false});
			return;
		} 
		if(docs[0].password != req.body.password) {
			console.log('incorrect password');
			//errorMessage='incorrect password';
			res.render('joinroom.ejs', {isRoomError: false, isPasswordError: true});
			return;
		}

		var name = docs[0].roomname;
		var id = docs[0]._id;
		if(docs[0].author == req.body.author) {
			res.render('room_admin.ejs', {roomid: id, roomname: name});
		} else {
			res.render('room_standard.ejs', {roomid: id, roomname: name});
		}
	});
}

exports.newroom = function(req, res) {
	res.render('newroom.ejs', {isRoomExistError: false});
}

exports.newroom_result = function(req, res) {
	
	//check if in database
	Schema.find({ roomname: req.body.roomname}, function (err, docs) {
		if (err) {
			console.log(err);
			res.status(500).json({status: 'fail'});
			return;
		} 
		//if it already exists in database
		if (docs.length != 0) {
			console.log(docs);
			console.log('this roomname already exists');
			res.render('newroom.ejs', {isRoomExistError: true});
			return;
		}
		//if it doesn't already exist in database
		var Room = new Schema({
			roomname: req.body.roomname,
			password: req.body.password,
			author: req.body.author,
			count: 0
		});
		Room.save(function (err, product, numberAffected) {
			if (err) {
				console.log(err);
				res.status(500).json({status: 'fail'});
				return;
			}
			console.log('success!');
			res.render('room_admin.ejs', {roomid: product._id, roomname: product.roomname});
		});
	});
}


exports.panic = function(req, res) {
	var id = req.query.roomid;
	var newcount;
	Schema.findById(id, function (err, docs){
		if(err) {
			console.log(err);
			res.status(500).json({status: 'fail'});
			return;
		}
		console.log(docs);
		console.log(docs.count);
		newcount = docs.count + 1;
		console.log(newcount);
		Schema.findByIdAndUpdate(id, {count: newcount}, function(err, docs){
			console.log(docs);
		});
	});
	res.render('error.ejs');
}

exports.unpanic = function(req, res) {
	var id = req.query.roomid;
	var newcount;
	Schema.findById(id, function (err, docs){
		if(err) {
			console.log(err);
			res.status(500).json({status: 'fail'});
			return;
		}
		console.log(docs);
		console.log(docs.count);
		newcount = docs.count - 1;
		console.log(newcount);
		Schema.findByIdAndUpdate(id, {count: newcount}, function(err, docs){
			console.log(docs);
		});
	});
	res.render('error.ejs');
}

// Reset count
exports.reset = function(req, res) {
	var id = req.query.roomid;
	Schema.findByIdAndUpdate(id, {count: 0}, function(err, docs){
		console.log(docs);
	});
}

exports.close = function(req, res) {
	console.log(document.getElementById('#panic'));


}