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
	res.render('joinroom.ejs');
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
			res.render('joinroom.ejs');
			return;
		} 

		if(docs[0].author == req.body.author) {
			res.render('room_admin.ejs');
		} else {
			var id = docs[0]._id;
			res.render('room_standard.ejs', {roomid: id});
		}


	});
}

exports.newroom = function(req, res) {
	res.render('newroom.ejs', {isRoomnameEmpty:false, 
								isPasswordEmpty:false, isAuthorEmpty:false});
}

exports.newroom_result = function(req, res) {
	// var isRoomnameEmpty = false;
	// console.log(req.body.roomname.trim().length);
	// //check all fields
	// if (req.body.roomname.trim().length == 0) {
	// 	isRoomnameEmpty = true;
	// 	res.render('newroom.ejs', {isRoomnameEmpty:isRoomnameEmpty, 
	// 							isPasswordEmpty:false, isAuthorEmpty:false});
	// 	return;
	// }
//		|| req.body.password == undefined 
//		|| req.body.author == undefined) {

//	}

	//check if in database

	Schema.find({ roomname: req.body.roomname}, function (err, docs) {
		if (err) {
			console.log(err);
			res.status(500).json({status: 'fail'});
		} else  {
			//if it doesn't already exist in database
			if (docs.length == 0) {
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
					} else {
						console.log('success!');
					}
				});

				res.render('room_admin.ejs');
			} else {
				console.log(docs);
				console.log('this roomname already exists');
				res.render('newroom.ejs');
			}
		}
	});
}


exports.panic = function(req, res) {
	//Schema.where({ roomname: req.session.room}).update({ count: count++ });
	console.log(req.body.roomid);
	//Schema.findByIdAndUpdate(id, {count: count++})
}

