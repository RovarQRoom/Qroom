import { Request, Response, NextFunction } from 'express';
import { SearchRepository } from '../Repository';
import { SearchService } from '../Service';

const searchRepository = new SearchRepository();
const searchService = new SearchService(searchRepository);

export const Search = async (req:Request, res:Response)=>{
    try{
        const { search } = req.query;
        const Hotels = await searchService.getSearchResult(search);
        res.render("QRoom_Home/Searchbar/Search.ejs", {Hotels});
    }catch(err){
        console.log(err);
    }
};

export const SearchResultMain = async (req:Request, res:Response)=>{
    res.render("QRoom_Home/Searchbar/Search.ejs")
}