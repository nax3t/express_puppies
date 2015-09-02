// boilerplate code
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	engine = require('ejs-mate');

// use ejs-locals for all ejs templates: 
app.engine('ejs', engine);
 
app.set('views',__dirname + '/views');
// set view engine so you can render('index') 
app.set('view engine', 'ejs');
// set static directory to public
app.use(express.static('public'));
// use body-parser
app.use(bodyParser.urlencoded({extended: true}));
// use method-override
app.use(methodOverride('_method'));

// assign puppies to array of objects
var puppies = [
		{
			id: 1,
			name: "Billy",
			age: 2,
			img: "http://cdn.sheknows.com/articles/2013/04/Puppy_2.jpg"
		},
		{
			id: 2,
			name: "Joey",
			age: 1,
			img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTDSLuUGcahRMlzSnurC5f1kLExUfTrnrGTt82753XgdhsJ_OTf"
		}
	]

// "GET" request to "/" path runs the function below
app.get('/', function (req, res) {
	res.render('puppies/index', {puppies: puppies, title: "Puppies"});
});

// list all puppies
app.get('/puppies', function (req, res) {
	res.render('puppies/index', {puppies: puppies, title: "Puppies"});
});

// new puppy form
app.get('/puppies/new', function (req, res) {
	res.render('puppies/new', {title: "Add puppy"});
});

// post new puppy
app.post('/puppies', function (req, res) {
		var name = req.body.name,
				age = req.body.age,
				img = req.body.img,
				id = puppies[puppies.length-1].id;

		puppies.push({id: id += 1, name: name, age: age, img: img});
		res.redirect('/puppies/'+id);
});

// show puppy by id
app.get('/puppies/:id', function (req, res) {
	var puppy = puppies[req.params.id-1];
	res.render('puppies/show', {puppy: puppy, title: puppy.name});
});

// start the server
app.listen(3000, function () {
	console.log('Starting a server on localhost:3000');
});