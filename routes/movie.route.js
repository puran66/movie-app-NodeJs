const express = require('express');
const { movieController } = require('../controller');
const upload = require('../middleware/multer');
const router = express.Router();

router.post('/addMovie',upload.single('movieImageUrl'),movieController.addmovie);
router.post('/update-movie/:id',upload.single('movieImageUrl'),movieController.updateMovie)
router.get('/get-movies',movieController.getMovies)
router.get('/delete-movie/:id',movieController.deleteMovie)
router.get('/get-movie-by-id/:id',movieController.getMovieById)


module.exports = router