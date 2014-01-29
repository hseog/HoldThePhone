// Test ejs
var ejs = require('ejs');
exports.helloworld = function(req, res){
   	res.render('helloworld.ejs', {name:req.param('name')});
}