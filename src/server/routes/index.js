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
  db.any("INSERT INTO movies (title,description,image_url,year,date_obtained,rating,notes,type) VALUES ('" + req.body.title + "','" + req.body.description + "','" + req.body.imageUrl + "'," + req.body.year + ", '2016-03-01' ," + req.body.rating + ",'" + req.body.notes + "','" + req.body.type + "');")
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

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [month, day, year].join('-');
}

module.exports = router;
