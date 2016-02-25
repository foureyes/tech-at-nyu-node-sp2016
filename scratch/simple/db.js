var mongoose = require('mongoose');
// Schema represents a collection, buuuuut...
// it actually gives structure to it
// we define key (property names), and their types

// creating schema Movie... yields an actual collection
// movies (lowercase, and plural) in mongodb
// db and collection doesn't have to exist yet
// (not sure when it gets made... when we add or here?)
var Movie = mongoose.Schema({
  title: String,
  id: Number,
  director: String
});

mongoose.model('Movie', Movie); // register

/*
var Cat = mongoose.model('Cat') // retrieve
*/
// connect to mongod sever running on localhost, database, catdb
mongoose.connect('mongodb://localhost/uhoh')
