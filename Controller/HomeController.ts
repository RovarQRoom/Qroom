import { Request, Response, NextFunction } from 'express';

export const Webpage = async(req:Request, res:Response) => {
    res.render("QRoom_Home/Main.ejs");
}

export const Contact = async(req:Request, res:Response) => {
    res.render("QRoom_Home/Contact.ejs");
}

export const Reviews = async(req:Request, res:Response) => {
    res.render("QRoom_Home/Reviews.ejs");
}

export const About = async(req:Request, res:Response) => {
    res.render("QRoom_Home/About.ejs");
}

export const Map = async(req:Request, res:Response) => {
    res.render("QRoom_Home/mapBox.ejs");
}
