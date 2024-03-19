const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
  movieImageUrl: {
    type: String,
    required: true,
    default: 'https://via.placeholder.com/1'
  },
  movieName: {
    type: String,
    required: true
  },
  movieDescription: {
    type: String,
    required: true,
  },
  uploadBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ' User'
  }
})

const Movie = mongoose.model("Movie", moviesSchema);

module.exports = Movie;