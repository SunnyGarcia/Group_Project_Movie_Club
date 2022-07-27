const MovieContoller = require("../controllers/mc.controller");

module.exports = (app) => {
    app.post("/api/movies", MovieContoller.createMovie)
    app.get("/api/movies", MovieContoller.getAllMovies)
    app.get("/api/movies/:id", MovieContoller.getOneMovie)
    app.put("/api/movies/:id", MovieContoller.updateMovie)
    app.delete("/api/movies/:id", MovieContoller.deleteMovie)
}