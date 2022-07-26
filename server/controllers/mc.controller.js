const Movie = require("../models/mc.model");

module.exports = {
 createMovie: (req, res) => {
  Movie.create(req.body)
    .then((newMovie) => {
      console.log(newMovie)
      res.json(newMovie)
    })
    .catch((err) => {
      res.status(400).json({err})
    });
 },

 getAllMovies: (req, res) => {
   Movie.find({})
     .then((allMovies) => {
       console.log(allMovies)
       res.json(allMovies)
     })
     .catch((err) => {
       res.status(400).json({err})
     });

 },

 getOneMovie: (req, res) => {
   Movie.findOne({_id: req.params.id})
     .then((oneMovie) => {
       console.log(oneMovie)
       res.json(oneMovie)
     })
     .catch((err) => {
       res.status(400).json({err})
     });
 },

 updateMovie: (req, res) => {
   Movie.findOneAndUpdate({_id: req.params.id},
     req.body,
     {new: true, runValidators: true})
     .then((updatedMovie) => {
       console.log(updatedMovie)
       res.json(updatedMovie)
     })
     .catch((err) => {
       res.status(400).json({err})
     });
 },

 deleteMovie: (req, res) => {
   Movie.deleteOne({_id: req.params.id})
     .then((deletedMovie) => {
       console.log(deletedMovie)
       res.json(deletedMovie)
     })
     .catch((err) => {
       res.status(400).json({err})
     });
 },
}