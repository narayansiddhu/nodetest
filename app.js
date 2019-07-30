var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var session = require('express-session');
var flash = require('connect-flash');
var fs = require('fs');


//get Routes
var files = require('./routes/file');

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
fs.mkdir('files', (err) => {
  if(err){
    console.log(err);
  }else{
    console.log("Directory Created")
  }
});
app.use('/', files);


app.set('port', (process.env.PORT || 3005));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});