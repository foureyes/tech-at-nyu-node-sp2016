var express = require('express');
var router = express.Router();

// get model constructor!
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

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

/*
router.get('/search', function(req, res){
    // res.render('movies', {movies:movies});
    res.render('movies', {movies:movies.filter(directedBy)});

    function directedBy(movie) {
       return movie.director === req.query.director; 
    }
});
*/
router.get('/search', function(req, res){
    // res.render('movies', {movies:movies});
    var query = req.query.director ? {director:req.query.director} : {}
    console.log('in search');
  Movie.find(query, function(err, movies, count){
    if(err) {
        console.log(err);
    }
    console.log(movies);
    res.render('movies', {movies:movies});
  }); 
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



module.exports = router;
