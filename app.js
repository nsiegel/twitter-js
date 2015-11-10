var express = require('express');
var fs = require('fs');
var morgan = require('morgan');
var swig = require('swig');

var app = express();
var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

//SWIG STUFF

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

swig.setDefaults({ cache: false });

app.get('/', function (req, res, next) {
  res.render('index', {title: 'Hall of Fame', people: people},function(err,html){
    if (err) return next(err);
    res.send(html);
  });
});

//END OF SWIG STUFF

app.get('/', function (req, res, next) {
  // console.log(req.route);
  console.log(accessLogStream);
  console.log('GET\n');
  next();
});

app.post('/', function (req, res, next) {
  // console.log(req.route);
  console.log('POST\n');
  next();
});

app.get('/', function (req, res) {
  console.log('Welcome');
});

var port = 3000;
app.listen(port, function() {
	console.log("listening to port "+ port);
});
