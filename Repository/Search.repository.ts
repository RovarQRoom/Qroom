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
      if(searchCache) return JSON.parse(searchCache);

      const searchResult = await this.searchModel.find({Name:{$regex:new RegExp(".*"+search+".*",'i')}}).limit(7).exec();
      await RedisModule.setAsync("search", JSON.stringify(searchResult));

      return searchResult;
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