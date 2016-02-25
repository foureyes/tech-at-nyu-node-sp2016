# Y U Noooooode.js

![yu no](http://i1.kym-cdn.com/entries/icons/original/000/004/006/y-u-no-guy.jpg)

## intros

* so you've decided to use node??? can't get enough js in your life? i will tell you about it
* who? am i really qualified to do this? maybe???
    * on 3rd semester teaching this, but still _rough around the edges!_
    * rough, javascript / node / frontend dev ecosystem change  all. the time.
* you 
    * no idea!
    * that's ok, typically my class consists of:
        * what's a css?
        * i get paid do this stuff *yawn*
        * soooo? hopefully i hit the sweet spot
* topics
    * minimum js
    * what's node / a quick cli app
    * http
    * express
    * templating
    * middleware
    * routes
    * get and post
    * with a db
    * with json and an api
* the early stuff, like js


## minimum javascript 

* types
    * primitives: number, string, boolean, null, undefined
    * objects
    * typeof isn't right, but it is
    * what
* functions as objects
* defining functions
* anonymous functions
* higher order functions
    * use functions that require functions to be passed in
        * array.filter
        * array.foreach
    * create functions 
        * how was foreach or filter created
        * callTwice
        * makeAdder
        * even after original function has returned


## node

* what's node?
* event loop, async io
* comparable to other techs (that i'm not familiar with at all)
* some applications that it's commonly used for / and maybe when you shouldn't
    * _soft realtime_ networking applications... like chat
    * very basic crud small web app 
    * apis (specifically for json based) is a good use case
    * not so much for processor intensive applications like video encoding or large scaledata mining
* installing node
* package management with npm
    * package.json
    * npm install
    * where do you find modules? node_modules... look up dir tree
    * package.json
* using modules
* creating modules and 
* require
* some built-ins
    * module.exports
    * process.env
    * fs module - read and write
    * http module
* an example of some external modules
* tell me again abt this event loop?
* ACTIVITY - get data from nba.com process it, and save it to a file
    * before we start, some things you should know:
    * parsing json
        * `var obj = JSON.parse(body);`
        * double quote prop names!
        * let's see
    * use requests module
        * install
            * `npm install requests --save`
        * usage
            * `var request = require('request');`
            * `request.get(url, callback)`
            * callback has error, response, body
            * `response.statusCode`
        * `var fs = require('fs');`
        * writing to a file: `fs.writeFile(filename, stuff to write, callback)`
        * (callback takes one arg, error)
            ```
    fs.writeFile('filename.txt',  "stuff" function (err) {
        if (err) {
            console.log(err);
        }
        console.log('writed all the things');

    });
            ```
    * url for data... [http://data.nba.com/data/15m/json/cms/noseason/game/20160221/0021500824/boxscore.json* grab data from data.nba.com](http://data.nba.com/data/15m/json/cms/noseason/game/20160221/0021500824/boxscore.json)   
    * what does data look like?
    * let's do this while printing out what we're doing as we go along (how?)
        * print out... getting data
        * retrieve data
        * say we got data
        * parse json
        * process
        * say we're going to save
        * save player's names from the home team to a file
        * say donzo!
    * let's do this the suspicious way first
    * another way...


## a quick primer on http? or maybe you already know?
* http request
    * method
    * path
    * body
* minimally, what are some http request methods?
* when you enter a url in your browser get or post?
* data in form? both!
* where's the data?
    * get - query string
    * post - body


## express intro

Typically, we think of a web app and a server as two distinct things. Node apps are both.

* _other setups_ maybe we'll have an app, an app server and a web server
    * rails + unicorn + nginx
    * rails + phusion passenger + apache
    * django + uwsgi + nginx
    * flask + gunicorn + nginx
    * php + fastcgi / nginx
* node, for better or worse, is both the app and the app server, and many times is deployed so that it's directly exposed to the outside world without a _traditional_ web server in front of it
* we can use the http module... 
    * but that's kind of too low level for this presentation.
* what's express?
    * microframework
    * similar to???
    * many others out there
    * pretty popular... and flexible (and some more featureful frameworks are built on top of this)
* installation
    * npm install express --save
* creating an app and defining some routes
    * app.get... url, callback with req, res
    * res.send to send back hello
    * note that it sets content type 4U!11!!11
    * add more than 1 route handler / router
* request object?
    * baseurl
    * ip (of remote request)
    * hostname (from host header)
    * url and originalUrl
    * method
    * some data related
        * body
        * params
        * query
    * route - currently matched route
    * xhr?
    * headers
    * get() ... header
* response object?
    * set(field, val) or set ({field:var}) set response header
    * send() ... send back 200 w/ body
    * status() ... send back status
        * chain with send to send body
        * status(404).send(body)
    * render(templatename, context) 
    * redirect(statuscode, path or url)
* running your app
    * node... whatever
    * nodemon
        * npm install -g nodemon
        * nodemon app.js
    * npm start 
        ```
    "scripts": {
    "start": "node ./bin/www"
    },
        ```

## templating

let's some templating

* handlebars (hbs)
    * many modules
    * easiest to actually go with hbs
    * [http://handlebarsjs.com/builtin_helpers.html](http://handlebarsjs.com/builtin_helpers.html)
* installing handlebars setting up
    ```
    npm install hbs
    app.set('view engine', 'hbs');
    res.render('index', {greeting:'hi!', name: 'joe'});
    ```
    * create views
        * layout.hbs - surrounding html
        * remainder of template goes in {{{ body }}}
        * index.hbs
* using handlebars
    * vars
        * escape vs noescape
        * html escape values (html entities)
    * loops
        * arrays
        * use #each and /each
        * @index is index
        * this is element
            ```
    <ul>
    {{#each numbers}}
    <li>{{@index}} - {{this}}</li>
    {{/each}}
    </ul>
            ```

    * objects
        * also use #each and /each
        * @key is prop name
        * this is element
        * also can use . notation
            ```
    {{obj.a}}
    <ul>
    {{#each obj}}
    <li>{{@key}} - {{this}}</li>
    {{/each}}
    </ul>
            ```

    * nested
        * if nested objects in list, can refer to each val by prop name (instead of this)
        * or you can dot this
            ```
    <ul>
    {{#each nested}}
    <li>{{this}} - {{name}} - {{this.name}}</li>
    {{/each}}
    </ul>
            ```

    * conditionals
        * \#if, else if, /else, .if
            ```
    {{#if condition}}
    {{else if condition}}
    {{else}}
    {{/if}}
    {{numbers}}
    {{#each numbers}}
    <p>{{this}}</p>
    {{/each}}
            ```

## middleware

* node is just a stack of middleware functions that operate on request and response objects
* until response is returned
* create our own - logging middleware
* it's just a function with req, res, next
* make sure to call next
* built-in middleware
    * express static
        ```
path = require('path')
use(express.static(path.resolve(__dirname, 'public')));
        ```
    * bring in css
    * images, etc.
* order matters for middleware


## creating routes with Router()

* move routes
* mount as middleware to specific path
    ```
// in routes/movies.js
var express = require('express');
var router = express.Router();
// router.get ...
module.exports = router;

// in app.js
var moviesRoutes = require('./routes/movies');
app.use('/movies', moviesRoutes);
    ```


## handling gets 

* how about a form with gets?
* shows up as req.query
* ok fine globals for storing 
* ACTIVITY search by book author? movie title? what are we doing here?


## handling posts

* body parser 
    ```
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
    ```

* get for form
* post for post req
* redirect???
* prg!!! try to use 303
* res.redirect(status code, path or url)
* ACTIVITY add new movie or book
* sample of /routes/movies.js
    ```
movies = [
    {id:1, title:'Me You and Everyone We Know', director:'Miranda July'},
    {id:2, title:'Stroszek', director:'Werner Herzog'},
    {id:3, title:'Fitzcaraldo', director:'Werner Herzog'},
    {id:4, title:'Eraserhead', director:'David Lynch'},
];

router.get('/create', function(req, res){
    // check if id exists probz, right???
    res.render('createForm');
});

router.post('/create', function(req, res) {
    movies.push({title:req.body.title, director:req.body.director, id:+req.body.id})
    res.redirect('/movies');
});

router.get('/', function(req, res){
    res.render('movies', {movies:movies});
});

router.get('/search', function(req, res){
    // res.render('movies', {movies:movies});
    res.render('movies', {movies:movies.filter(directedBy)});

    function directedBy(movie) {
       return movie.director === req.query.director; 
    }
});

router.get('/:id', function(req, res){
    // check if id exists probz, right???
    var movie;
    console.log(req.params);
    for(var i = 0; i < movies.length; i++) {
        if(movies[i].id === +req.params.id) {
            movie = movies[i]
        }
    }
    res.render('movie', {movie:movie});
});

    ```

## Mong-uh-oh!

* document store
    * dbs contain collections of documents (objects)
    * you can have many dbs
    * you can have many collections
    * javascript api to query...
* installing
    * use brew / apt / etc.
    * cloud ...mongolab?
    * running mongod
    * it may want /data/db
    * if it does, make that directory or specify a directory that you have write access to
* familiar with relational dbs?
    * dbs are... well dbs
    * collections are tables
    * objects are rows
* some commands
    * use databasename // switch to a db
    * show collections // display all collections in this db that we switched to
    * db.collectionname.find() // all
    * db.collectionname.find({prop:val}) // with prop = val
    * db.collectionname.remove({prop:val})
* insert a few books / movies?

Mongoose

* ODM instead of ORM?
* we define a schema that represents a collection
* but we give it types! ... so that all documents in a collection created using this schema have same fields and types
* Schema represents a collection, buuuuut...
*  it actually gives structure to it
*  we define key (property names), and their types
*  creating schema Movie... yields an actual collection in db
*  ... collection name is movies (lowercase, and plural) in mongodb
*  db and collection doesn't have to exist yet
*  (not sure when it gets made... when we add or here?)
    ```
var mongoose = require('mongoose');
var Movie = mongoose.Schema({
  title: String,
  id: Number,
  director: String
});
    ```

* now we have a schema, register it as a model
* and connect to server
    ```
mongoose.model('Movie', Movie); // register
// we can use model as constructor to create and insert or model name to find
mongoose.connect('mongodb://localhost/uhoh')
    ```
* find
    ```
  Movie.find({title:someTitle}, function(err, movies, count){
    if(err) {
        // 500 more appropriate
        console.log(err);
    }
    console.log(movies);
    res.render('movies', {movies:movies});
  }); 
    ```
* create
    ```
  console.log('within post');
  var p = new Pizza({
    crust: req.body.crust,
    size: req.body.size
  })

  console.log('before save');
  // call save to actually store in database
  //
  p.save(function(err, pizza, count){
    console.log('within save');
    // do stuff when the save is done
    console.log('error', err);
    res.redirect(303, '/pizzas');
  });
    ```


## AYYYYY JAX


* make an api end point!
    * call res.json instead
* steps for get request
    * var req = new XMLHttpRequest();
    * req.open('GET', url, true);
    * req.addEventListener("load", function() {});
    * req.send();
* document.querySelector
* document.querySelectorAll
    ```
document.addEventListener("DOMContentLoaded", function(){
	var btn = document.getElementById('btn');
	btn.addEventListener("click", function(evt){
		evt.preventDefault();
		var url = "http://localhost:3000/api/movies";
		var director = document.getElementById('director').value;
		url = url + "?director=" + director;
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
		console.log('clicked');
		req.addEventListener("load", function() {
			console.log(req.responseText);
			var tbody = document.createElement('tbody');
			tbody.id = "movie-list";
			JSON.parse(req.responseText).forEach(function(movie) {
				var tr = tbody.appendChild(document.createElement('tr'));
				tr.appendChild(document.createElement('td')).textContent = movie.title;
				tr.appendChild(document.createElement('td')).textContent = movie.director;
				tr.appendChild(document.createElement('td')).textContent = movie.year;
			});
			var movieList = document.getElementById('movie-list');
			movieList.parentNode.replaceChild(tbody, movieList);
			console.log(tbody);
		});
		req.send();
	})
})
    ```
* for a post...
    ```
var request = new XMLHttpRequest();
request.open('POST', '/create', true);
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
request.send(title='movieTitle');
    ```

