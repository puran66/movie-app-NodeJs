const uploadImage = require("../middleware/cloudinary");
const { movieServices, userServices } = require("../services");

const addmovie = async (req, res) => {
  try {
    const { movieName, movieDescription } = req.body;
    const imagePath = req.file.path;
    if (!movieName || !movieDescription) {
      res.status(400).json({ message: "Movie name and description are required" });
    }

    const token = req.cookies.token;

    const getUser = userServices.getProfile(token)
    // console.log(getUser._id);

    const userId = getUser._id;

    const movieImageUrl = await uploadImage(imagePath); 

    const addedMovie = await movieServices.addMovie(movieName, movieDescription, userId ,movieImageUrl.url);

    res.status(201).json({
      message: "movie added success",
      movie: addedMovie
    })
  } catch (error) {
    console.log(error);
  }
}

const updateMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const movieImageUrl = req.file.path;

    if(id.length !== 24){
      res.status(400).json({message:"Invalid ID"})
    }
    const updatedData = {
      ...body,
      movieImageUrl
    }
    const upadted = await movieServices.updateMovie(id, updatedData);

    if (!upadted) {
      res.status(404).json({ message: "can't update Movie" })
    }

    res.status(200).json({
      message: "data updated success",
      updatedData
    })
  } catch (error) {
    console.log(error);
  }
}

const deleteMovie = async (req, res) => {
  try {
    const id = req.params.id;

    if(id.length !== 24){
      res.status(400).json({message:"Invalid ID"})
    }

    const deleted = await movieServices.deleteMovie(id);

    if (!deleted) {
      res.status(404).json({ message: "No such Movie found" })
    }

    res.status(200).json({
      message: "deleted success",
      deleted
    })
  } catch (error) {
    console.log(error);
  }
}

const getMovies = async (req, res) => {
  try {
    const movies = await movieServices.getMovies();

    res.status(200).json({
      message: "movies get success",
      movies
    })
  } catch (error) {
    console.log(error);
  }
}

const getMovieById = async (req, res) => {
  try {
    const id = req.params.id;

    if(id.length !== 24){
      res.status(400).json({message:"Invalid ID"})
    }

    const movie = await movieServices.getMovieById(id);
    // console.log(movie);

    if (movie && Object.keys(movie).length == 0) {
      res.status(404).json({ message: "No such Movie found" })
    }

    res.status(200).json({
      message: "movie get success",
      movie
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports = { addmovie, updateMovie, deleteMovie, getMovies, getMovieById }