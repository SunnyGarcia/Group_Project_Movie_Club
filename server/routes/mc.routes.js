const MovieController = require("../controllers/mc.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post("/api/movies", authenticate, MovieController.createMovie)
    app.get("/api/movies", MovieController.getAllMovies)
    app.get("/api/movies/:id", MovieController.getOneMovie)
    app.get("/api/moviesbyuser/:firstName", authenticate, MovieController.findAllMoviesByUser);
    app.put("/api/movies/:id", authenticate, MovieController.updateMovie)
    app.delete("/api/movies/:id", MovieController.deleteMovie)
}