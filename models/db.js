// 'mongodb://shet:seog1122@ds027829.mongolab.com:27829/holdthephone'

var mongoose = require('mongoose');

mongoose.connect('mongodb://eugenet:password@ds027479.mongolab.com:27479/holdthephone');

module.exports = mongoose.connection;