import jwt from 'jsonwebtoken';
import { UserSignUp } from "../models/UsersSchema";
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv'

dotenv.config();

export const requireAuth = (req:Request, res:Response, next:NextFunction)=>{
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
export const checkUser =  (req:Request, res:Response, next:NextFunction)=>{
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
                let user = await UserSignUp.findById(decodedToken.id);
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
