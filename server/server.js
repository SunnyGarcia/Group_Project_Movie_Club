const express = require('express');
const cors = require('cors');
const cookieSession = require("cookie-session"); //added
const cookieParser = require("cookie-parser"); //added
const app = express();

require('dotenv').config();
//require("../server/config/")

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());


app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

require("./config/mongoose.config");
require('./routes/mc.routes')(app);
require('./routes/user.routes')(app);


const jwt = require("jsonwebtoken");
var token = jwt.sign({ id: "movie" }, process.env.JWT_SECRET);
console.log("token: ", token);
const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
console.log(decodedToken);

app.listen(process.env.PORT, () => {
    console.log("Listening at Port", process.env.PORT)
});

// app.listen(8000, () =>{
//     console.log("Listening on Port 8000")
// });
