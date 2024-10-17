const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt");
const express = require("express");                                
const User = require("../models/userModels.js")
const jwt = require("jsonwebtoken");

const registerUser =asyncHandler( async (req,res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400)
        throw new Error("all fields are mandatory")
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("user already registered")
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    })
    if(user){
        res.status(201).json({_id:user.id,email:user.email})
    }
    else{
        res.status(400)
        throw new Error("User data is not valid")
    }
    res.status(200).json("user is registered")
})
const loginUser =asyncHandler( async (req,res)=>{
    const {email, password} = req.body;
   
    if(!email || !password){
       res.status(400)
       throw new Error("All fields are mandatory")
    }
    
    const user = await User.findOne({email});
    if(user && await (bcrypt.compare(password ,user.password))){
        const accessToken = jwt.sign(
            {
            user:{
                username: user.username,
                email : user.email,
                _id : user.id
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"1d"}
    );
        res.status(200).json({accessToken})
    } else{
        res.status(401)
        throw new Error("email or password is not valid")
    }
   
})
const currentUser =asyncHandler( async (req,res)=>{
    res.status(200).json(req.user)
})

module.exports = {registerUser,loginUser,currentUser}
