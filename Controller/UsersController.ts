//Mongodb User Model
import { UserSignUp } from "../models";

//Cookie Handlers
// import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';
import { CreateUserDto } from "../Dtos";
import { UserRepository } from "../Repository";
import { UserService } from "../Service";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

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
    const CreateUserDto = <CreateUserDto>req.body;
    console.log(CreateUserDto);
    

  try {
    await userService.createUser(CreateUserDto);
    res.status(201).json(CreateUserDto);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export const Login_Post = async (req:Request,res:Response)=>{

}
