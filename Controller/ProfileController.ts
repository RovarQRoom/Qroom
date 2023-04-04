import { UserSignUp } from "../models";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from 'express';

export const Profile = async(req:Request, res:Response) => {

    res.render("QRoom_Home/profile.ejs");
}

export const ProfileDataUpdate = async(req:Request, res:Response) => {
  
}

export const PictureWebpage = async(req:Request, res:Response) => {
    res.render("QRoom_Home/picture_Update.ejs");
}

export const ProfilePictureUpdate = async(req:Request, res:Response, next:NextFunction) => {
}
