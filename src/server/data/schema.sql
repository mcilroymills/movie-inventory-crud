DROP DATABASE IF EXISTS movie_inventory_crud;
CREATE DATABASE movie_inventory_crud;

\connect movie_inventory_crud;

CREATE TABLE movies (
  id serial PRIMARY KEY,
  title varchar(70),
  description text,
  image_url varchar(200),
  year int,
  date_obtained date,
  rating int,--(1 through 5)
  notes text,
  type varchar(15)

);

INSERT INTO
movies
VALUES
(DEFAULT, 'The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'http://ia.media-imdb.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_UY1200_CR88,0,630,1200_AL_.jpg', 1994, '2004-12-25', 10, 'All time favorite.', 'DVD'),
(DEFAULT, 'The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.','http://ia.media-imdb.com/images/M/MV5BMTIyMTIxNjI5NF5BMl5BanBnXkFtZTcwNzQzNDM5MQ@@._V1_SX640_SY720_.jpg', 1972, '2006-03-27', 10, 'All time favorite.', 'DVD'),
(DEFAULT, 'The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.', 'http://ia.media-imdb.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UY1200_CR90,0,630,1200_AL_.jpg', 2008, '2009-12-25', 9, 'Fun, exciting', 'Blue-ray'),
(DEFAULT, '12 Angry Men', 'A dissenting juror in a murder trial slowly manages to convince the others that the case is not as obviously clear as it seemed in court.','http://ia.media-imdb.com/images/M/MV5BODQwOTc5MDM2N15BMl5BanBnXkFtZTcwODQxNTEzNA@@._V1_UY1200_CR85,0,630,1200_AL_.jpg', 1957, '1999-08-14', 9, 'Always relevant', 'VHS'),
(DEFAULT, 'The Pianist', 'A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto of World War II.', 'http://themoviescore.com/wp-content/uploads/2013/08/the-pianist.jpg', 2002, '2014-01-15', 8.5, 'Get out the tissue box.', 'Download (.avi)'),
(DEFAULT, 'Back to the Future', 'A young man is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his friend, Dr. Emmett Brown, and must make sure his high-school-age parents unite in order to save his own existence.', 'http://www.coverwhiz.com/content/Back-To-The-Future.jpg', 1985, '2012-06-12', 9.5, 'Nostalgic fun', 'Download (.avi)');
