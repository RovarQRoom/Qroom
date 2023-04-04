import { Model, Document } from 'mongoose';
import { UserSignUp, IUser } from '../models';
import { CreateUserDto, UpdateUserDto, DeleteUserDto } from '../Dtos/UsersDto';

export class UserRepository {
  private userModel: Model<IUser>;

  constructor() {
    this.userModel = UserSignUp;
  }

  async findById(id: string): Promise<Document | null> {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async findByEmail(email: string): Promise<Document | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<Document> {
    const user = new this.userModel(createUserDto);
    await user.save();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Document | null> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    }).exec();
    return user;
  }

  async delete(id: string,deleteUserDto: DeleteUserDto): Promise<void> {
    await this.userModel.findByIdAndUpdate(id,deleteUserDto,{
        new:true
    }).exec();
  }
}