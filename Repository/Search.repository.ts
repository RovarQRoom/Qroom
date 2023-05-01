import { Document, Model } from "mongoose";
import { ISearchRepository } from "../Interface/repository-interface";
import { Hotels, IHotels } from "../models";
import { SearchDto } from '../Dtos';
import RedisModule from "../Module/Redis.module";


export class SearchRepository implements ISearchRepository {
  private searchModel: Model<IHotels>;

  constructor() {
    this.searchModel = Hotels;
  }

  async find(search: any): Promise<Document[]> {
    try {
      const searchCache = await RedisModule.getAsync("search");
      const searchJSON = JSON.parse(searchCache || '');
      console.log("searchJSON",searchJSON[0].Name);

      console.log(searchJSON[0].Name === search);
      
      if(searchCache) {
        console.log("Congratulation, you are using cache");
      return searchJSON;
      }else{
        await RedisModule.clearAsync();
        const searchResult = await this.searchModel.find({Name:{$regex:new RegExp(".*"+search+".*",'i')}}).limit(7).exec();
        await RedisModule.setAsync("search", JSON.stringify(searchResult), 60);
        return searchResult;
      }

    } catch (error) {
      throw new Error(`Failed to get search result: ${error}`);
    }
  }

    async findMain(searchDto: SearchDto): Promise<Document[]> {
        try {
            const searchResult = await this.searchModel.find({City:searchDto.city}).limit(7).exec();
            return searchResult;
        } catch (error) {
            throw new Error(`Failed to get search result: ${error}`);
        }
    }
}