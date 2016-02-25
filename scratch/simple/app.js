var express = require('express');
var path = require('path')
var bodyParser = require('body-parser');
require('./db');
var moviesRoutes = require('./routes/movies');
var app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended:false}))

app.use('/movies', moviesRoutes);

app.get('/', function(req, res) {
    res.render('index', {greeting:'hi!', name: 'joe'});
});

app.get('/templateVariables', function(req, res) {
    var context = {
        numbers:[1, 2, 3, 4],
        obj: {a:1, b:2, c:3},
        nested: [{name:'alice'}, {name:'bob'}]
    };
    res.render('templateVariables', context);
});

app.get('/array', function(req, res) {
    res.render('array', {numbers:[1, 2, 3, 4]})
});

app.get('/object', function(req, res) {
    res.render('object', {thing:{a:1, b:2, c:3}}) ;
});

app.get('/nestedObjects', function(req, res) {
    res.render('/nestedObjects', {nestedThings:{obj:{a:1, b:2, c:3}, d:4, e:5, f:6}});
});
app.listen(process.env.PORT || 3000);
//console.log(process.env);
