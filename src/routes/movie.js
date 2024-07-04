const express = require('express')
const router = express.Router()
const { addMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } = require('../controllers/movie')

router.post('/addMovie', addMovie);
router.get('/getAllMovies', getAllMovies);
router.get('/getMovie/:movieId', getMovieById);
router.put('/update/:movieId', updateMovie);
router.delete('/delete/:movieId', deleteMovie);


module.exports = router;