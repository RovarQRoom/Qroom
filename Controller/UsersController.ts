
import { Request, Response, NextFunction } from 'express';
import { CreateUserDto } from "../Dtos";
import { UserRepository } from "../Repository";
import { UserService } from "../Service";
import {  setTokenCookie } from '../Middleware';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'

dotenv.config();
const secretKey = process.env.JWT_SECRET || 'secretKey';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);


export const Signup_Get = (req:Request,res:Response)=>{
  res.render("QRoom_Home/Signup.ejs");
}

export const Login_Get = (req:Request,res:Response)=>{
  res.render("QRoom_Home/Login.ejs");
}

export const Logout_Get = (req:Request,res:Response)=>{
  res.cookie('jwt','',{maxAge:1});
  res.render("QRoom_Home/Temp/Logout.ejs");
}

export const Signup_Post = async (req:Request,res:Response)=>{
  const createUserDto = <CreateUserDto>req.body;
  try {
    const user = await userService.createUser(createUserDto);
    const token = jwt.sign({ userId: user.id }, secretKey);
    setTokenCookie(res, token);
    console.log("User Created And Logged In");
    
    res.status(201).redirect("/Home");
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export const Login_Post = async (req:Request,res:Response)=>{
  const {email,password} = req.body;
  try {
    const user = await userService.UserLoggin(email,password);
    const token = jwt.sign({ userId: user?.id }, secretKey);
    setTokenCookie(res, token);
    
    console.log("User Logged In");
    res.status(200).redirect("/Home");
  }catch (error) {
    res.status(500).json({ error: error });
  }
}