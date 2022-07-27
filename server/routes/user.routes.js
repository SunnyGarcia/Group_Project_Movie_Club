const {getUser, login, logout, register} = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config")

module.exports = (app) => {
    app.post("/newuser", register);
    app.post("/login", login);
    app.post("/logout", logout);
    app.get("/users/:_id", getUser);

}

// module.exports = (app) => {
//     app.get("/allUsers", UserController.findAllUsers);
//     app.post("/register", UserController.register);
//     app.post("/login", UserController.login);
//     app.post("/logout", UserController.logout);
//     app.get("/users/secure", authenticate, UserController.getLoggedInUser);
//     // app.get("user/:_id", UserController.getUser);
// }