import {Hotels} from "../models/HotelsSchema";
import {Event} from "../models/EventsSchema";
import { UserSignUp } from "../models/UsersSchema";
import { Booking } from "../models/BookingSchema";
import { Request, Response, NextFunction } from 'express';



//Post Purchasing
export const HighCrestPurchase = async(req:Request, res:Response) => {
}
    //End Post Purchasing

export const RemoveEvent = async(req:Request, res:Response) => {

    res.redirect("/HighCrest/Home");
}

export const HighCrestHome = async(req:Request, res:Response) => {
    res.render("QRoom_Home/HighCrest/Home.ejs");
}

export const HighCrestAllRooms = async(req:Request, res:Response) => {

    res.render("QRoom_Home/HighCrest/AllRooms/AllRooms.ejs");
}

export const HighCrestRoom = async(req:Request, res:Response) => {
    res.render("QRoom_Home/HighCrest/Rooms/Rooms.ejs");
}


export const HighCrestBlog = async(req:Request, res:Response) => {

    res.render("QRoom_Home/HighCrest/Blog/Blog.ejs");
}

export const HighCrestContacts = async(req:Request, res:Response) => {
    res.render("QRoom_Home/HighCrest/Contacts/Contact.ejs");
}

export const HighCrestEvents = async(req:Request, res:Response) => {
    res.render("QRoom_Home/HighCrest/Events/Events.ejs");
}

export const HighCrestAbout = async(req:Request, res:Response) => {
    res.render("QRoom_Home/HighCrest/About/About.ejs");
}

export const HighCrestRestaurants = async(req:Request, res:Response) => {
    res.render("QRoom_Home/HighCrest/Resturant/Resturant.ejs");
}

export const HighCrestChefsProfiles = async(req:Request, res:Response) => {
    res.render("QRoom_Home/HighCrest/Portfolio/Portfolio.ejs");
}