// Packages imports
const mongoose = require('mongoose');

// Creating movie schema
const movieSchema = new mongoose.Schema({
  releaseDate: {
    type: Date,
    default: undefined,
  },
  title: {
    type: String,
    default: undefined,
  },
  productionBudget: {
    type: Number,
    default: undefined,
  },
  domesticGross: {
    type: Number,
    default: undefined,
  },
  worldWideGross: {
    type: Number,
    default: undefined,
  },
});

const Movie = new mongoose.model('Movie', movieSchema);

module.exports = Movie;
