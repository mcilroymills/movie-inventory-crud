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
      console.log(data);
      res.status(200).render('index', { data:data });
    })
    .catch(function (err) {
      return next(err);
    });
});

//Goes to new page
router.get('/movies/new', function(req, res, next) {
  res.status(200).render('new', {});

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

module.exports = router;
