<<<<<<< HEAD
// Test ejs
var ejs = require('ejs');
exports.helloworld = function(req, res){
   	res.render('helloworld.ejs', {name:req.param('name')});
}

exports.helloworld_result = function(req, res) {
	res.render('helloworld_result.ejs', {classroom:req.body.classroom, password:req.body.password})
=======

var Schema = require('../schemas/room');

module.exports = function (confused) {
    
    var functions = {};

    functions.confused = function(req, res) {
	
    }
>>>>>>> 417a2372588652b6fbc72287a120261794c0d576
}