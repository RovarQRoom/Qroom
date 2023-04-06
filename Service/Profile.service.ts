import { ProfileServiceInterface } from '../Interface/service-interface';
import { ProfileRepository } from '../Repository/';
import { Document } from 'mongoose';

export class ProfileService implements ProfileServiceInterface {
  private profileRepository: ProfileRepository;

  constructor(profileRepository: ProfileRepository) {
    this.profileRepository = profileRepository;
  }

  async getUserById(id: string): Promise<Document | null> {
    try {
      const user = await this.profileRepository.findById(id);
      return user;
    } catch (error) {
      throw new Error(`Failed to get user with id ${id}: ${error}`);
    }
  }

  async updateUserPicture(id: string, pictureFile: string): Promise<Document | null> {
    try {
      const user = await this.profileRepository.updatePicture(id, pictureFile);
      return user;
    } catch (error) {
      throw new Error(`Failed to update user with id ${id}: ${error}`);
    }
  }
}
