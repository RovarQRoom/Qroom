import { Request, Response, NextFunction } from "express";
import { sendEmailMiddleware } from "../Middleware";
import { ContactusDto } from '../Dtos/Contact.dto';

export const Webpage = async (req: Request, res: Response) => {
  res.render("QRoom_Home/Main.ejs");
};

export const Contact = async (req: Request, res: Response) => {
  res.render("QRoom_Home/Contact.ejs");
};

export const Contact_Us = async (req: Request, res: Response) => {
    const contactusDto = <ContactusDto>req.body;
    try {
        sendEmailMiddleware(contactusDto);
        // res.status(201).redirect(`/Contact`);
    } catch (error) {
        console.log(error);
    }
};

export const Reviews = async (req: Request, res: Response) => {
  res.render("QRoom_Home/Reviews.ejs");
};

export const About = async (req: Request, res: Response) => {
  res.render("QRoom_Home/About.ejs");
};

export const Map = async (req: Request, res: Response) => {
  res.render("QRoom_Home/mapBox.ejs");
};
