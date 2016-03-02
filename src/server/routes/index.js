/* Author: Mills McIlroy
 * Date: March 2, 2016
 * Description: Movie Inventory CRUD assignment. Avoided using any client-side javascript/jQuery!!
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
  console.log(req.query);
  if (req.query.title) {
    db.any('SELECT * FROM movies ORDER BY title ' + req.query.title)
    .then(function (data) {
      res.status(200).render('index', { data:data, title:req.query.title });
    })
    .catch(function (err) {
      return next(err);
    });
  }
  else if (req.query.year) {
    db.any('SELECT * FROM movies ORDER BY year ' + req.query.year)
    .then(function (data) {
      res.status(200).render('index', { data:data, year:req.query.year});
    })
    .catch(function (err) {
      return next(err);
    });
  }
  else if (req.query.date_obtained) {
    db.any('SELECT * FROM movies ORDER BY date_obtained ' + req.query.date_obtained)
    .then(function (data) {
      res.status(200).render('index', { data:data, date_obtained:req.query.date_obtained });
    })
    .catch(function (err) {
      return next(err);
    });
  }
  else if (req.query.rating) {
    db.any('SELECT * FROM movies ORDER BY rating ' + req.query.rating)
    .then(function (data) {
      res.status(200).render('index', { data:data, rating:req.query.rating });
    })
    .catch(function (err) {
      return next(err);
    });
  }
  else if (req.query.type) {
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
  db.any('SELECT * FROM movies WHERE id=' + req.params.id)//Returns an array
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
  var thisDay = formatDate();
  console.log(thisDay);
  console.log("INSERT INTO movies (title,description,image_url,year,date_obtained,rating,notes,type) VALUES ('" + req.body.title + "','" + req.body.description + "','" + req.body.imageUrl + "'," + req.body.year + ",'" + thisDay + "'," + req.body.rating + ",'" + req.body.notes + "','" + req.body.type + "');");
  db.any("INSERT INTO movies (title,description,image_url,year,date_obtained,rating,notes,type) VALUES ('" + req.body.title + "','" + req.body.description + "','" + req.body.imageUrl + "'," + req.body.year + ",'" + thisDay + "'," + req.body.rating + ",'" + req.body.notes + "','" + req.body.type + "');")
    .then(function () {
      res.status(200).redirect('/');
    })
    .catch(function (err) {
      return next(err);
    });
});


//Updates existing movie in database
router.post('/movies/:id/edit', function(req, res, next) {
  db.any("UPDATE movies SET title='" + req.body.title + "',description='" + req.body.description + "',image_url='" + req.body.imageUrl + "',year=" + req.body.year + ",rating=" + req.body.rating + ",notes='" + req.body.notes + "',type='" + req.body.type + "' WHERE id=" + req.params.id)
    .then(function () {
      res.status(200).redirect('/');
    })
    .catch(function (err) {
      return next(err);
    });
});

//Deletes a movie from db
router.post('/movies/:id/delete', function(req, res, next) {
  db.any('DELETE FROM movies WHERE id=' + req.params.id)
    .then(function (data) {
      res.status(200).redirect('/');
    })
    .catch(function (err) {
      return next(err);
    });
});

//Returns the current date in sql friendly string format to be
//used by the add new movie page for date_obtained
var formatDate = function () {
  var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return year + month + day;
};

module.exports = router;
