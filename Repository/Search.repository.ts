import { Model } from "mongoose";
import { ISearchRepository } from "../Interface/repository-interface";


export class SearchRepository implements ISearchRepository {
  private searchModel: Model<Document>;

  constructor(searchModel: Model<Document>) {
    this.searchModel = searchModel;
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