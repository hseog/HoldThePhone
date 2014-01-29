/**
 * Module dependencies.
 */

var express = require("express");
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// environment
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.compress());

// development only
if ('development' == app.get('env')) {
   app.use(express.errorHandler());
}

app.get('/', function (req, res) {
    res.send('<h1>Homepage</h1>');
});

app.get('/about', function(req, res) {
    res.send('<h2>about me</h2>');
});

app.get('/name/:myname', function(req, res) {
    res.send('My name is ' + req.params.myname);
});

http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
   });