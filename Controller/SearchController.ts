import mongoose  from "mongoose";
import { Hotels } from '../models/HotelsSchema';
import { Request, Response, NextFunction } from 'express';


export const Search = async (req:Request, res:Response)=>{

};

export const SearchResult = async (req:Request, res:Response)=>{

    res.render("QRoom_Home/Searchbar/Search.ejs");
}

export const SearchResultMain = async (req:Request, res:Response)=>{
    res.render("QRoom_Home/Searchbar/Search.ejs")
}