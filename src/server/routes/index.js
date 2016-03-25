/* Author: Mills McIlroy
 * Date: March 2, 2016
 * Description: Movie Inventory CRUD assignment. Avoided using any client-side javascript!!
 */
var express = require('express');
var router = express.Router();

var options = {
  // Initialization Options
};
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/movie_inventory_crud';
var db = pgp(connectionString);

//Returns all movies with basic info, allows user to sort
router.get('/', function(req, res, next) {
  //Queries will only be done if req.query.___ is an appropriate value
  if (req.query.title === 'asc' || req.query.title === 'desc') {
    db.any('SELECT * FROM movies ORDER BY title ' + req.query.title)
    .then(function (data) {
      res.status(200).render('index', { data:data, title:req.query.title });
    })
    .catch(function (err) {
      return next(err);
    });
  }
  else if (req.query.year === 'asc' || req.query.year === 'desc') {
    db.any('SELECT * FROM movies ORDER BY year ' + req.query.year)
    .then(function (data) {
      res.status(200).render('index', { data:data, year:req.query.year});
    })
    .catch(function (err) {
      return next(err);
    });
  }
  else if (req.query.date_obtained === 'asc' || req.query.date_obtained === 'desc') {
    db.any('SELECT * FROM movies ORDER BY date_obtained ' + req.query.date_obtained)
    .then(function (data) {
      res.status(200).render('index', { data:data, date_obtained:req.query.date_obtained });
    })
    .catch(function (err) {
      return next(err);
    });
  }
  else if (req.query.rating === 'asc' || req.query.rating === 'desc') {
    db.any('SELECT * FROM movies ORDER BY rating ' + req.query.rating)
    .then(function (data) {
      res.status(200).render('index', { data:data, rating:req.query.rating });
    })
    .catch(function (err) {
      return next(err);
    });
  }
  else if (req.query.type === 'asc' || req.query.type === 'desc') {
    db.any('SELECT * FROM movies ORDER BY type ' + req.query.type)
    .then(function (data) {
      res.status(200).render('index', { data:data, type:req.query.type });
    })
    .catch(function (err) {
      return next(err);
    });
  }
  else {
    db.any('SELECT * FROM movies ORDER BY date_obtained DESC')//Returns an array
      .then(function (data) {//Name the array var "data"
        res.status(200).render('index', { data:data });
      })
      .catch(function (err) {
        return next(err);
      });
  }
});

//Goes to new movie page
router.get('/movies/new', function(req, res, next) {
  res.status(200).render('new', {});

});

//Goes to edit page
router.get('/movies/:id/edit', function(req, res, next) {
  db.any('SELECT * FROM movies WHERE id=$1', req.params.id)//Returns an array
    .then(function (data) {//Name the array var "data"
      console.log(data);
      res.status(200).render('edit', { data:data });
    })
    .catch(function (err) {
      return next(err);
    });
});

//Creates a new movie in database
router.post('/movies', function(req, res, next) {
  db.none("INSERT INTO movies (title,description,image_url,year,rating,notes,type) VALUES (${title},${description},${image_url},${year},${rating},${notes},${type})", req.body)
    .then(function () {
      res.status(200).redirect('/');
    })
    .catch(function (err) {
      return next(err);
    });
});

//Updates existing movie in database
router.post('/movies/:id/edit', function(req, res, next) {
  db.none("UPDATE movies SET title=$1,description=$2,image_url=$3,year=$4,rating=$5,notes=$6,type=$7 WHERE id=$8", [req.body.title, req.body.description, req.body.image_url, req.body.year, req.body.rating, req.body.notes, req.body.type, req.params.id])
    .then(function () {
      res.status(200).redirect('/');
    })
    .catch(function (err) {
      return next(err);
    });
});

//Deletes a movie from db
router.post('/movies/:id/delete', function(req, res, next) {
  db.any('DELETE FROM movies WHERE id=$1', req.params.id)
    .then(function (data) {
      res.status(200).redirect('/');
    })
    .catch(function (err) {
      return next(err);
    });
});

module.exports = router;
