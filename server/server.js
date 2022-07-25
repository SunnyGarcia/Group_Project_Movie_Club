const express = require('express');
const cors = require('cors');
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const app = express();

const jwt = require("jsonwebtoken");
require('dotenv').config();
//require("../server/config/")
app.use(cors()); 
app.use(express.json());
//cookies handler
app.use(cookieParser({credentials: true, origin: 'http://localhost:3000'}));
app.use(require('body-parser').urlencoded({extended: true}));   
app.use(express.urlencoded({ extended: true })); 

app.use(cors({ 
    credentials: true,
    origin: process.env.Client_URL
}));
app.use(
    cookieSession({
        name: "movie_club",
        secret: "ThisCookieIsASecret", 
        httpOnly: true
    })
);

require('./routes/mc.routes')(app);


app.listen(process.env.PORT, () =>{
    console.log('Up and running on port: ', process.env.PORT)
    });
