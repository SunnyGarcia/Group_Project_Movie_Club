const {findAllUsers, login, logout, register, getUser, getLoggedInUser} = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config")

module.exports = (app) => {
    app.post("/newuser", register);
    app.post("/login", login);
    app.post("/logout", logout);
    app.get("/allUsers", findAllUsers)
    app.get("/users/:_id", getUser);
    app.get("/user/secure", authenticate, getLoggedInUser);

}
