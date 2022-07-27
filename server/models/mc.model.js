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

 date: {type: String,
 required: [true, 'Date is required'],
 minLength: [3, 'Must be at least 3 characters long!']},

 description: {type: String,
 required: [true, 'description is required'],
 minLength: [5, 'Must be at least 5 characters long!']},

 rated: {type: String},
 

 length: {type: String},
 

 stars: {type: String},

 createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  
  
  
  
}, {timestamps: true})
 
const Movie = mongoose.model("Movie", MovieSchema);
 
module.exports = Movie;
