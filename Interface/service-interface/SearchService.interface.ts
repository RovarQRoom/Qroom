import { Document } from "mongoose";

export interface ISearchService {
    getSearchResult(search: string): Promise<Document[]>;
}