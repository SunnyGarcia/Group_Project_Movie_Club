const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({

 title: {type: String,
 required: [true, 'Title is required'],
 minLength: [3, 'Must be at least 3 characters long!']},

 genre: {type: String,
 required: [true, 'Genre is required'],
 minLength: [3, 'Must be at least 3 characters long!']},

 director: {type: String,
 required: [true, 'Director is required'],
 minLength: [3, 'Must be at least 3 characters long!']},

 yearReleased: {type: Number,
 required: [true, 'Year of Release is required'],
 min: [1880, 'I think the first film was made in 1880!']},

 description: {type: String,
 required: [true, 'description is required'],
 max: [ new Date() , "You cannot enter a release data that happens in the future" ]},

 movieArt: {
    type: String,
 },

 rated: {
    type: String,
 },
 

 length: {type: String},
 

 rating: {
    type: Number,
    min: [0, "Rating can not be less than 0"],
    max: [10, "Rating can not be higher than 10"]
 },

 actor: {
    type: String,
 },

 createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  
  
  
  
}, {timestamps: true})
 
const Movie = mongoose.model("Movie", MovieSchema);
 
module.exports = Movie;
