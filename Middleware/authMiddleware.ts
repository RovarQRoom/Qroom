import jwt from 'jsonwebtoken';
import { UserSignUp } from "../models/UsersSchema";
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv'

dotenv.config();

export const requireAuth = (req:Request, res:Response, next:NextFunction)=>{
    
}

//Check Current User
export const checkUser =  (req:Request, res:Response, next:NextFunction)=>{
    
}
