import { Document, Model } from "mongoose";
import { ISearchRepository } from "../Interface/repository-interface";
import { Hotels, IHotels } from "../models";


export class SearchRepository implements ISearchRepository {
  private searchModel: Model<IHotels>;

  constructor() {
    this.searchModel = Hotels;
  }

  async find(search: string): Promise<Document[]> {
    try {
      const searchResult = await this.searchModel.find({ $text: { $search: search } });
      return searchResult;
    } catch (error) {
      throw new Error(`Failed to get search result: ${error}`);
    }
  }
}