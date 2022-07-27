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
        User.findOne({email: req.body.email})
            .then((userRecord) => {
                if(userRecord === null){
                    res.status(400).json({message: "Invalid Login Attempt"})
                }
                else {
                    bcrypt.compare(req.body.password, userRecord.password)
                        .then((isPasswordValid) => {
                            if(isPasswordValid) {
                                console.log("Password is valid");
                                res.cookie(
                                    "usertoken",
                                    jwt.sign(
                                        {
                                            id: userRecord._id,
                                            email: userRecord.email,
                                            username: userRecord.username
                                        },
                                        process.env.JWT_SECRET
                                    ),
                                        {
                                            httpOnly: true,
                                            expires: new Date(Date.now() + 90000000)
                                        }
                                ).json({
                                    message: "Successfully",
                                    userLoggedIn: userRecord.username,
                                    userId: userRecord._id
                                });
                            }
                            else {
                                res.status(400).json({message: "Invalid Attempt"})
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json({message: "Invalid Attempt 2"});
                        })
                }

            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({message: "Invalid Attempt 3"});
            })
    }

    const getLoggedInUser = async (req, res) => {
        // const decodedJWT = jwt.decode(req.cookies.usertoken, {
        //     complete: true
        // })

        User.findOne({_id: req.jwtpayload.id})
            .then((user) => {
                console.log(user);
                res.json(user)
            })
            .catch((err) => {
                console.log(err);
            })
    }



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


