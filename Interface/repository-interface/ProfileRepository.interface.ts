import { Document } from "mongoose";

export interface IProfileRepository {
    findById(id: string): Promise<Document | null>;
    updatePicture(id: string, picture: string): Promise<Document | null>;
}
