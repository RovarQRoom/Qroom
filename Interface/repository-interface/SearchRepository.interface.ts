import { Document } from "mongoose";

export interface ISearchRepository {
    find(search: string): Promise<Document[]>;
}