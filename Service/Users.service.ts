import { UserRepository } from '../Repository/';
import { CreateUserDto, UpdateUserDto, DeleteUserDto } from '../Dtos/Users.dto';
import { Document } from 'mongoose';
import { IUsersService } from '../Interface/service-interface';

export class UserService implements IUsersService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(id: string): Promise<Document | null> {
    try {
      const user = await this.userRepository.findById(id);
      return user;
    } catch (error) {
      throw new Error(`Failed to get user with id ${id}: ${error}`);
    }
  }

  async UserLoggin(email: string, password: string): Promise<Document | null> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if(await this.userRepository.comparePassword(password, user?.get('password'))){
        console.log('Password Matched');
        return user;
      }
      console.log('Password Not Matched');
      return null;
    } catch (error) {
      throw new Error(`Failed to get user with email ${email}: ${error}`);
    }
  }

  async getUserByEmail(email: string): Promise<Document | null> {
    try {
      const user = await this.userRepository.findByEmail(email);
      return user;
    } catch (error) {
      throw new Error(`Failed to get user with email ${email}: ${error}`);
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<Document> {
    try {
      const user = await this.userRepository.create(createUserDto);
      return user;
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<Document | null> {
    try {
      const user = await this.userRepository.update(id, updateUserDto);
      return user;
    } catch (error) {
      throw new Error(`Failed to update user with id ${id}: ${error}`);
    }
  }

  async deleteUser(id: string, deleteUserDto: DeleteUserDto): Promise<Document | null> {
    try {
      const user = await this.userRepository.delete(id, deleteUserDto);
      return user;
    } catch (error) {
      throw new Error(`Failed to delete user with id ${id}: ${error}`);
    }
  }
}
