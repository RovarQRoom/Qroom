export interface ISearchRepository {
    find(search: string): Promise<Document[]>;
}