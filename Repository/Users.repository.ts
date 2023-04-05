import { Model, Document, ObjectId } from 'mongoose';
import { UserSignUp, IUser } from '../models';
import { CreateUserDto, UpdateUserDto, DeleteUserDto } from '../Dtos/UsersDto';
import { MongoDbExceptions } from '../ExceptionHandling';

export class UserRepository {
  private userModel: Model<IUser>;
  private mongoDbExceptions: MongoDbExceptions;

  constructor() {
    this.userModel = UserSignUp;
    this.mongoDbExceptions = new MongoDbExceptions();
  }

  async findById(id: string): Promise<Document | null> {
    if(this.mongoDbExceptions.isAValidObjectId(id)){
      throw new Error('Invalid Id');
    } 

    const user = await this.userModel.findById(id).exec();

    if (!user) throw new Error('User not found');

    return user;
  }

  async findByEmail(email: string): Promise<Document | null> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) throw new Error(`User was not found by email: ${email}`);

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<Document> {
    const user = new this.userModel(createUserDto);

    if (!user) throw new Error('User Cant Be Created');

    await user.save();

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Document | null> {
    if(this.mongoDbExceptions.isAValidObjectId(id)){
      throw new Error('Invalid Id');
    } 

    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    }).exec();

    if (!user) throw new Error('User was not found And Cant Be Updated');

    return user;
  }

  async delete(id: string,deleteUserDto: DeleteUserDto): Promise<Document | null> {
    if(this.mongoDbExceptions.isAValidObjectId(id)){
      throw new Error('Invalid Id');
    } 

    const user = await this.userModel.findByIdAndUpdate(id,deleteUserDto,{
        new:true
    }).exec();
    
    if (!user) throw new Error(`User was not found And Cant Be Deleted`);

    return user; 
  }
}