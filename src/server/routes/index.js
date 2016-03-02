var express = require('express');
var router = express.Router();

var options = {
  // Initialization Options
};
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/movie_inventory_crud';
var db = pgp(connectionString);

//Returns all movies with basic info
router.get('/', function(req, res, next) {
  db.any('SELECT * FROM movies ORDER BY date_obtained')//Returns an array
    .then(function (data) {//Name the array var "data"
      res.status(200).render('index', { data:data });
    })
    .catch(function (err) {
      return next(err);
    });
});

//Goes to new movie page
router.get('/movies/new', function(req, res, next) {
  res.status(200).render('new', {});

});

//Creates a new movie in database
router.post('/movies', function(req, res, next) {
  console.log(req.body.title);
  console.log(req.body.description);
  console.log(req.body.imageUrl);
  console.log(req.body.year);
  console.log(req.body.rating);
  console.log(req.body.notes);
  console.log(req.body.type);
  db.any("INSERT INTO movies (title,description,image_url,year,date_obtained,rating,notes,type) VALUES ('" + req.body.title + "','" + req.body.description + "','" + req.body.imageUrl + "'," + req.body.year + ", '2016-03-01' ," + req.body.rating + ",'" + req.body.notes + "','" + req.body.type + "');")
    .then(function () {
      res.status(200).redirect('/');
    })
    .catch(function (err) {
      return next(err);
    });
});

//Goes to edit page
router.get('/movies/:id/edit', function(req, res, next) {
  db.any('SELECT * FROM movies WHERE id=' + req.params.id)//Returns an array
    .then(function (data) {//Name the array var "data"
      console.log(data);
      res.status(200).render('edit', { data:data });
    })
    .catch(function (err) {
      return next(err);
    });
});

//Deletes a movie from db
router.post('/movies/:id/delete', function(req, res, next) {
  db.any('SELECT * FROM movies WHERE id=' + req.params.id)//Returns an array
    .then(function (data) {//Name the array var "data"
      console.log(data);
      res.status(200).redirect('/');
    })
    .catch(function (err) {
      return next(err);
    });
});


module.exports = router;
