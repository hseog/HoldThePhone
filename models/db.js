<<<<<<< HEAD
// 'mongodb://shet:seog1122@ds027829.mongolab.com:27829/holdthephone'

var mongoose = require('mongoose');

mongoose.connect('mongodb://eugenet:password@ds027479.mongolab.com:27479/holdthephone');
=======
var mongoose = require('mongoose');

mongoose.connect('mongodb://hseog:seog1122@ds027829.mongolab.com:27829/holdthephone');
>>>>>>> 417a2372588652b6fbc72287a120261794c0d576

module.exports = mongoose.connection;