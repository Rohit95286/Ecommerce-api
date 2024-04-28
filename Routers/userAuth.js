const express = require('express');
const { hashPassword, stringifyPassword} = require('../utils/password');
const authRouter = express.Router();
const User = require('./../models/user');
const { generatetokenWithEmailAndId, jwtExpiryTime } = require('./../utils/tokenGeneration');
require('./../utils/tokenGeneration');

// Register name, email , password and save hashed password.

authRouter.post('/register' , async (req, res)=>{
    const {name , email , password} = req?.body
    const hashedPassword = hashPassword(password)
    try{
        const user = await new User({name : name , email : email , password:hashedPassword}).save()
        res.status(200).send(`${name} account created`);
    }
    catch(error){
        res.status(500).send("server error");
    }
})


// login take name , find user and if password matcches give jwt token (name , id and  toekn expire in  times);

authRouter.post('/login' , async (req, res)=>{
    const {email , password} = req?.body;
    try{
        const user = await User.findOne({email:email}).select('email password');
        const passwordMatched = password == stringifyPassword(user.password);
        const jwtTokenForUser = generatetokenWithEmailAndId(user?.email , user?.password);
        if(passwordMatched){
            res.status(200).send({...user?._doc , jwtToken : jwtTokenForUser , expiresIn : jwtExpiryTime});
        }
        else{
            res.status(404).send("not varified user");
        }
    }
    catch(error){
        res.status(404).send("server error")
    }
})







module.exports=authRouter