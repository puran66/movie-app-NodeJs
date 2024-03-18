const { movieSchema } = require("../model")

const addMovie = (movieName,movieDescription,userId ,movieImageUrl) =>{
  return movieSchema.create({movieName,movieDescription,movieImageUrl,uploadBy:userId})
}

const deleteMovie = (_id) =>{
  return movieSchema.findByIdAndDelete({_id});
}

const updateMovie = (_id,updateData)=>{
  return movieSchema.findByIdAndUpdate({_id},updateData);
}

const getMovies = () =>{
  return movieSchema.find({});
}

const getMovieById = (_id) =>{
  return movieSchema.find({_id})
}

module.exports = {addMovie,getMovies,updateMovie,deleteMovie,getMovieById};