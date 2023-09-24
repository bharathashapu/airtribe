CREATE DATABASE bms;

USE bms;


# Bookmyshow is a ticketing platform where you can book tickets for a movie show. The image attached represents that for a given theatre we can see the next 7 dates. As one chooses the date, we get list of all shows running in that theatre along with the show timings.
# P1 - As part of this assignment, we need to list down all the entities, their attributes and the table structures for the scenario mentioned in the previous slide. You also need to write the SQL queries required to create these tables along with few sample entries. Ensure the tables follow 1NF, 2NF, 3NF and BCNF rules.

CREATE TABLE theatre(id BIGINT NOT NULL, name VARCHAR(100), totalHalls INT, city VARCHAR(50), PRIMARY KEY (id));

CREATE TABLE movie(id BIGINT NOT NULL, name VARCHAR(100) NOT NULL, description VARCHAR(250), languages VARCHAR(50), genre VARCHAR(30), releaseDate DATE, duration INT, certificate VARCHAR(5), PRIMARY KEY(id));

CREATE TABLE shows(id BIGINT NOT NULL, date DATE NOT NULL, time TIME NOT NULL, totalSeats INT, format VARCHAR(50), language VARCHAR(30), dimension VARCHAR(10), hallNumber INT, theatreID BIGINT, movieID BIGINT,
PRIMARY KEY (id), FOREIGN KEY (theatreID) REFERENCES theatre(id), FOREIGN KEY (movieID) REFERENCES movie(id));


# ADD DATA to TABLES



INSERT INTO theatre(id, name, totalHalls, city) VALUES (1, 'PVR: Hyderabad', 7, 'Hyderabad');
INSERT INTO theatre(id, name, totalHalls, city) VALUES (2, 'PVR: Bangalore Electronic City', 5, 'Banaglore');
INSERT INTO theatre(id, name, totalHalls, city) VALUES (3, 'PVR: Nogix Superplex Mall', 7, 'Noida');
INSERT INTO theatre(id, name, totalHalls, city) VALUES (4, 'AMB Cinemas: Gachibowli', 7, 'Hyderabad');

INSERT INTO movie(id, name, description, languages, genre, releaseDate, duration, certificate) VALUES (1, 'Jawan', 'A high-octane action thriller that outlines the emotional journey of a man who is set to rectify the wrongs in society', 'Hindi, Telugu, Tamil', 'Action, Thriller', '2023-09-07', 169, 'U/A');
INSERT INTO movie(id, name, description, languages, genre, releaseDate, duration, certificate) VALUES (2, 'The Nun II', 'The sequel to the worldwide smash hit follows Sister Irene as she once again comes face-to-face with Valak, the demon nun', 'English, Hindi, Telugu, Tamil', 'Horror, Mystery, Thriller', '2023-09-07', 111, 'A');
INSERT INTO movie(id, name, description, languages, genre, releaseDate, duration, certificate) VALUES (3, 'Gadar II', 'Gadar 2 brings back India\'s most loved family of Tara, Sakeena and Jeete; 22 years after its predecessor. Set against the backdrop of Indo-Pakistan war 1971, Tara Singh, oce again, will face every enemey to protect the honor of country and family', 'Hindi', 'Action, Drama, Period', '2023-08-11', 170, 'U/A');

INSERT INTO shows(id, date, time, totalSeats, format, language, dimension, hallNumber, theatreID, movieID) VALUES (1, '2023-09-07', '11:15:00', 60, 'IMAX', 'Telugu', '2D', 1, 1, 1);
INSERT INTO shows(id, date, time, totalSeats, format, language, dimension, hallNumber, theatreID, movieID) VALUES (2, '2023-09-07', '15:45:00', 60, 'DOLBY 5.1', 'Hindi', '2D', 2, 1, 2);
INSERT INTO shows(id, date, time, totalSeats, format, language, dimension, hallNumber, theatreID, movieID) VALUES (3, '2023-09-07', '22:10:00', 60, 'RDX SOUND', 'Hindi', '2D', 3, 1, 3);
INSERT INTO shows(id, date, time, totalSeats, format, language, dimension, hallNumber, theatreID, movieID) VALUES (4, '2023-09-08', '11:00:00', 120, 'ICE', 'Hindi', '2D', 1, 2, 1);
INSERT INTO shows(id, date, time, totalSeats, format, language, dimension, hallNumber, theatreID, movieID) VALUES (5, '2023-09-08', '14:00:00', 120, 'DOLBY 8.1', 'English', '4DX', 2, 2, 2);
INSERT INTO shows(id, date, time, totalSeats, format, language, dimension, hallNumber, theatreID, movieID) VALUES (6, '2023-09-08', '18:00:00', 120, 'IMAX', 'Hindi', '3D', 3, 2, 3);
INSERT INTO shows(id, date, time, totalSeats, format, language, dimension, hallNumber, theatreID, movieID) VALUES (7, '2023-09-08', '21:00:00', 120, 'DOLBY 5.1', 'Tamil', '2D', 4, 2, 1);
INSERT INTO shows(id, date, time, totalSeats, format, language, dimension, hallNumber, theatreID, movieID) VALUES (8, '2023-09-09', '11:45:00', 150, 'DOLBY 8.1', 'Telugu', '2D', 1, 3, 1);
INSERT INTO shows(id, date, time, totalSeats, format, language, dimension, hallNumber, theatreID, movieID) VALUES (9, '2023-09-09', '13:15:00', 150, '4K PROJECTION', 'English', '2D', 2, 3, 2);
INSERT INTO shows(id, date, time, totalSeats, format, language, dimension, hallNumber, theatreID, movieID) VALUES (10, '2023-09-09', '16:40:00', 150, 'DOLBY ATMOS', 'Hindi', '2D', 3, 3, 3);
INSERT INTO shows(id, date, time, totalSeats, format, language, dimension, hallNumber, theatreID, movieID) VALUES (11, '2023-09-09', '20:30:00', 150, 'DOLBY 8.1', 'Tamil', '2D', 4, 3, 1);

#Testing DATA in TABLES

SELECT * FROM movie;
SELECT * FROM theatre;
SELECT * FROM shows;

# P2 - Write a query to list down all the shows on a given date at a given theatre along with their respective show timings. 

SELECT theatre.name AS theatre, movie.name AS movie, shows.date AS date, shows.time AS time, shows.language AS language FROM shows
JOIN movie ON movie.id = shows.movieID
JOIN theatre ON theatre.id = shows.theatreID
WHERE shows.date = '2023-09-08' AND shows.theatreID = 2;

