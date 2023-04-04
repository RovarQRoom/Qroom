const jwt = require('jsonwebtoken');
const UserModels = require("../models/UsersSchema");

const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;

    //Check if Token Exist And Verified
    if(token){
        jwt.verify(token,'rovar hanaw avan yassin',(err,decodedToken)=>{
            if(err){
                console.log(err);
                res.redirect("/Login");
            }else{
                console.log(decodedToken);
                next();
            }
        });
    }else{
        res.redirect("/Login");
    }
}

//Check Current User
const checkUser =  (req,res,next)=>{
    const token = req.cookies.jwt;
    //Check if Token Exist And Verified
    if(token){
        jwt.verify(token,'rovar hanaw avan yassin', async (err,decodedToken)=>{
            if(err){
                console.log(err);
                res.locals.user = null;
                req.isAuth = false;
                next();
            }else{
                console.log(decodedToken);
                let user = await UserModels.UserSignUp.findById(decodedToken.id);
                res.locals.user = user;
                res.locals.token = token;
                next();
                req.userId = user._id; 
                req.isAuth = true;
                return user;
            }
        });
    }else{
        res.locals.user = null;
        req.isAuth = false;
        next();
    }
}

module.exports = {requireAuth,checkUser};