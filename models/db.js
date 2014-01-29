var mongoose = require('mongoose');

mongoose.connect('mongodb://hseog:seog1122@ds027829.mongolab.com:27829/holdthephone');

module.exports = mongoose.connection;