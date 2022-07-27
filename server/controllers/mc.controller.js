const Movie = require("../models/mc.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports = {
 createMovie: (req, res) => {
  const newMovieObject = new Movie(req.body);
  const decodedJWT = jwt.decode(req.cookies.usertoken, {
    complete: true
  })
  newMovieObject.createdBy = decodedJWT.payload.id

  newMovieObject.save()
    
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
    .populate("createdBy", "firstName email")
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

 findAllMoviesByUser: (req, res) => {
  if(req.jwtpayload.firstName !== req.params.firstName) {
    console.log("not the user");

    User.findOne({firstName: req.params.firstName})
      .then((userNotLoggedIn) => {
        Movie.find({createdBy: userNotLoggedIn._id})
          .populate("createdBy", "firstName")
          .then((allMoviesFromUser) => {
            console.log(allMoviesFromUser);
            res.json(allMoviesFromUser);
          })
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      })
  }

  else{
    console.log("current user")
    console.log("req.jwtpayload.id:", req.jwtpayload.id);
    Movie.find({ createdBy: req.jwt.payload.id })
      .populate("createdBy", "firstName")
      .then((allMoviesFromLoggedInUser) => {
        console.log(allMoviesFromLoggedInUser);
        res.json(allMoviesFromLoggedInUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      })
  }
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