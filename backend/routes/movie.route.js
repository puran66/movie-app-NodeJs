const express = require('express');
const { movieController } = require('../controller');
const upload = require('../middleware/multer');
const { authenticate, checkAuth } = require('../middleware/auth');
const router = express.Router();

router.post('/add-movie',authenticate,checkAuth(["ADMIN"]), upload.single('movieImageUrl'), movieController.addmovie);
router.post('/update-movie/:id',authenticate,checkAuth(["ADMIN"]), upload.single('movieImageUrl'), movieController.updateMovie)
router.get('/get-movies',authenticate,checkAuth(["ADMIN","USER"]), movieController.getMovies)
router.get('/delete-movie/:id',authenticate,checkAuth(["ADMIN"]), movieController.deleteMovie)
router.get('/get-movie-by-id/:id',authenticate,checkAuth(["ADMIN"]) , movieController.getMovieById)


module.exports = router