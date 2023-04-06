export interface ISearchService {
    getSearchResult(search: string): Promise<Document[]>;
}