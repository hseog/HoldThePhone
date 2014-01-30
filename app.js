/**
 * Module dependencies.
 */

var express = require("express");
var MongoStore = require('connect-mongo')(express);
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();

var db = require('./models/db');



// environment
// Set port 3000
app.set('port', process.env.PORT || 3000);
// Set views variable to '/views'
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));

//cookies
//app.use(express.cookieParser());
//app.use(express.session({
//	secret: 'keyboard cat',
//	store: new MongoStore({
//		mongoose_connection: db
//	})
//}));

// Allows parsing of body
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);



// Sets homepage
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.compress());

// development only
if ('development' == app.get('env')) {
   app.use(express.errorHandler());
}

// Test ejs
//app.get('/helloworld/:name', routes.helloworld);
//app.post('/helloworld/result', routes.helloworld_result)
db.mongoose.once('open', function callback() {
	app.get('/joinroom', routes.joinroom);
	app.post('/joinroom/result', routes.joinroom_result);
	app.get('/newroom', routes.newroom);
	app.post('/newroom/result', routes.newroom_result);

	app.get('/panic', routes.panic);

});


http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
   });