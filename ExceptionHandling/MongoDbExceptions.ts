import { ObjectId } from 'mongodb';

export class MongoDbExceptions {

    isAValidObjectId(id: string): Boolean {
        return ObjectId.isValid(id);
    }
}