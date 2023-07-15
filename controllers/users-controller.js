const asyncHandler = require("express-async-handler");
const User = require("../models/user-models.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("username, email and password is required");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("user already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword---", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    })
    console.log(`user created: ${user}`);
    if (user) {
        res.status(200).json({_id: user.id, email: user.email });
    }
    else{
        res.status(400);
        throw new Error("invalid user data!")
    } 
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("email and password is required");
    }
    const user =await User.findOne({email});
    if (email && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRETE,
            {expiresIn: "15m"},
        )
        res.status(200).json({accessToken})
    }
    else{
        res.status(401);
        throw new Error("email or password is invalid!");
    }
});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser }