import { ObjectId } from 'mongodb';
import { IUser, UserSignUp } from '../models';
import { Model } from 'mongoose';

export class MongoDbExceptions {
    private userModel: Model<IUser>;

    constructor() {
        this.userModel = UserSignUp;
      }

    isAValidObjectId(id: string): Boolean {
        return ObjectId.isValid(id);
    }

    async isEmailDuplicate(email: string): Promise<Boolean> {
        const user = await this.userModel.findOne({ email }).exec();
        if(user){
            return true;
        }
        return false;
    }
}