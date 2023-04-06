import { Document } from "mongoose";

export interface ProfileServiceInterface {
    getUserById(id: string): Promise<Document | null>;
    updateUserPicture(id: string, pictureFile: string): Promise<Document | null>;
  }