import { Document } from "mongoose";
import { ISearchService } from "../Interface/service-interface";
import { SearchRepository } from "../Repository";


export class SearchService implements ISearchService {
  private searchRepository: SearchRepository;

  constructor(searchRepository: SearchRepository) {
    this.searchRepository = searchRepository;
  }

  async getSearchResult(search: string): Promise<Document[]> {
    try {
      const searchResult = await this.searchRepository.find(search);
      return searchResult;
    } catch (error) {
      throw new Error(`Failed to get search result: ${error}`);
    }
  }
}