var express = require('express');
var http = require('http');
var app = express();
var OAuth = require('oauth').OAuth;
var qs = require('qs');
var Twitter = require('./modules/twitter');

app.configure(function(){
	app.set('port', 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.locals.pretty = true;
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'super-duper-secret-secret' }));
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

//routes

app.get('/', function(req, res) {
	res.render('index');
});
app.get('/index', function(req, res) {
	res.render('index');
});
app.get('/api/followers/get', function(req, res) {
	Twitter.getFollowers({ screen_name: 'supratim', count: '100'}, function(err) {
		res.send(err, 400);
	}, function(data) {
		res.send(data);
	});
});

app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });


http.createServer(app).listen(app.get('port'), function() {
	initTwitter();
	console.log("Express server listening on port " + app.get('port'));
})


function initTwitter() {
	var error = function (err, response, body) {
		console.log('ERROR [%s]', err);
    };
    var success = function (data) {
    	console.log('Data [%s]', data);
    };
	//get your own keys
	var config = {
	    "consumerKey": "blah",
	    "consumerSecret": "blah",
	    "accessToken": "blah",
	    "accessTokenSecret": "blah"
	};

    Twitter.init(config);

}

