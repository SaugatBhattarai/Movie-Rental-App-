const express = require('express');
const router = express.Router();

const movies = [
    { id: 1, movie:"Titanic", genre:"Romance"},
    { id: 2, movie:"Catch me If you Can", genre:"Crime"},
    { id: 3, movie:"Pirates of the Caribbean: The Curse of the Black Pearl", genre:"Action"},
    { id: 4, movie:"The Pursuit of Happiness", genre:"Drama"},
    { id: 5, movie:"Cast Away", genre:"Adventure"}
];

router.get('/', (req, res) => {
    res.send(movies);
});

router.get('/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie NOT FOUND');
    res.status(200).send(movie)
});

router.post('/',(req, res) => {
   
    const { error } = validateMovie( req.body )
    if ( error ) return res.status(400).send(error.details[0].message);

    const movie = {
        id: movies.length + 1,
        movie: req.body.movie,
        genre: req.body.genre
    }

    movies.push(movie)
    res.status(200).send(movies)
});

router.put('/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie NOT FOUND');

    const { error } = validateMovie( req.body )
    if ( error ) return res.status(400).send(error.details[0].message);

    movie.movie = req.body.movie;
    movie.genre = req.body.genre;

    res.status(200).send(movie)
});

router.delete('/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie NOT FOUND');

    const index = movies.indexOf(movie);
    movies.splice(index, 1);

    res.send(movies)
});

function validateMovie(movie) {
    const schema = Joi.object({
        movie: Joi.string().min(2).required(),
        genre: Joi.string().min(3).required(),
    });
    return schema.validate(movie)
}

module.exports = router;