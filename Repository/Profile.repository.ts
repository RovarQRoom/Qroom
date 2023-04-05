import { Model, Document } from 'mongoose';
import { UserSignUp, IUser } from '../models';
import { MongoDbExceptions } from '../ExceptionHandling';

export class ProfileRepository {
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


  async updatePicture(id: string, pictureFile: string): Promise<Document | null> {
    if(this.mongoDbExceptions.isAValidObjectId(id)){
      throw new Error('Invalid Id');
    } 

    const user = await this.userModel.findByIdAndUpdate(id, {picture:pictureFile}, {
      new: true,
    }).exec();

    if (!user) throw new Error('User was not found And Cant Be Updated');

    return user;
  }

}