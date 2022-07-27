const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const {body} =req;
    try{
        const queryUser = await User.findOne({email: body.email})
            if(queryUser){
                res.status(400).json({error: "Email address is already registered."});
                console.log("First Error Block.")
                return;
            }
        }
        catch (error) {
            console.log("Second Error Block.")
            res.status(400).json(error);
    }

let newUser = new User(body);
    try {
        const newUserObject = await newUser.save();
        res.json(newUserObject);
    }
    catch(error) {
        console.log("Error saving UserObject");
        res.status(400).json(error);
        return;
    }
}

const login = async (req, res) => {
    const {body} = req;

    if(!body.email){
        res.status(400).json({message: "Must provide email address."});
        return;
    }
    let userQuery;
    try{
        userQuery =  await User.findOne({email: body.email});
    }
    catch(error){
        res.status(400).json({message: "Email not found."});
    }
    console.log("Query: ", userQuery);

    if(userQuery === null){
        res.status(400).json({message: "Email not found."});
        return;
    }

const verifyPassword = bcrypt.compareSync(body.password, userQuery.password);
if(!verifyPassword){
    res.status(400).json({message: "Email or password is incorrect."});
    return;
}

else{
    console.log("Password is valid.");
    res.cookie("usertoken", 
        jwt.sign({
            user_id: userQuery._id,
            email: userQuery.email,
            username: userQuery.firstName
            }, 
            process.env.JWT_SECRET), 
            {
            httpOnly: true,
            expires: new Date(Date.now() + 9000000),
            })
            .json({msg: "Successful Login!",
            user_id: userQuery._id ,
            firstName: userQuery.firstName,
            userLoggedIn: userQuery.firstname
            });
}
};

//Logout User
const logout = async (req, res) => {
    res.clearCookie("usertoken");
    res.json({message: "Logout Successful."})
    };

const findAllUsers = async (req, res) => {
    User.find()
        .then((allUsers) => {
            res.json(allUsers);
        })
        .catch((err) => {
            console.log("Find All Users Failed");
            res.json({ message: "Something went wrong in findAll", error: err})
        })
}

const getLoggedInUser = async (req, res) => {
    User.findOne({_id: req.jwtpayload.id})
        .then((user) => {
            console.log(user);
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
        })
}

const getUser = (req, res) =>{
        User.findById({_id: req.params._id})
            .then((single) => {
                console.log("User: ", req.body)
                res.json(single);
            })
            .catch((err) =>{
                console.log(err);
                res.json({msg: "Error retrieving event from database", error:err})
            });
    
        }
module.exports = {findAllUsers, login, logout, register, getUser, getLoggedInUser};


