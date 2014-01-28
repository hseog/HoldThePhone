var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.compress());

app.get('/', function (req, res) {
    res.send('<h1>Homepage</h1>');
});

app.get('/about', function(req, res) {
    res.send('<h2>about me</h2>');
});

app.get('/name/:myname', function(req, res) {
    res.send('My name is ' + req.params.myname);
});

app.listen(3000);