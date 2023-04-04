//Mongodb User Model
import { UserSignUp } from "../models/UsersSchema";

//Cookie Handlers
import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

const handleErrors = (err:any)=>{
    // console.log(err.message,err.code);
    // let errors = {name:'',email:'',password:'',phoneNumber:'',dateOfBirth:''};

    // //Duplicate Error Code
    // if(err.code === 11000){
    //     errors.email = 'That Email is Already Registered';
    //     return errors;
    // }

    // //Invalid Email
    // if(err.message === "Incorrect Email"){
    //     errors.email= "That Email is Not Registered";
    // }

    // //Invalid Password
    // if(err.message === "Incorrect Password"){
    //     errors.password= "Invalid Password";
    // }

    // //Validation Errors
    // if(err.message.includes('UsersSignedUp validation failed')){  
    //     Object.values(err.errors).forEach(({ properties }) => {
    //         errors[properties.path] = properties.message;
    //     })
    // }
    // return errors;
}

const createToken = (id:string)=>{
    // return jwt.sign({id},process.env.JWT_SECRET,{
    //     expiresIn:process.env.JWT_AGE
    // })
}

export const Signup_Get = (req:Request,res:Response)=>{
    res.render("QRoom_Home/Signup.ejs");
}

export const Login_Get = (req:Request,res:Response)=>{
    res.render("QRoom_Home/Login.ejs");
}

export const Logout_Get = (req:Request,res:Response)=>{
    // res.cookie('jwt','',{maxAge:1});
    res.render("QRoom_Home/Temp/Logout.ejs");
}

export const Signup_Post = async (req:Request,res:Response)=>{

}

export const Login_Post = async (req:Request,res:Response)=>{

}
