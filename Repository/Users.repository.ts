import { Model, Document, ObjectId } from 'mongoose';
import { UserSignUp, IUser } from '../models';
import { CreateUserDto, UpdateUserDto, DeleteUserDto } from '../Dtos/UsersDto';
import { MongoDbExceptions } from '../ExceptionHandling';
import bcrypt from 'bcrypt';
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
    if(await this.mongoDbExceptions.isEmailDuplicate((createUserDto.email).toString())){
      console.log('Email Already Exists');
      throw new Error('Email Already Exists');
    }

    createUserDto.password = await this.hashPassword((createUserDto.password).toString());

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

  async hashPassword(password: string): Promise<any> {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hashSync(password, saltRounds);
    return passwordHash;
  }

  async comparePassword(password: string, passwordHash: string): Promise<boolean> {
    const passwordMatch = await bcrypt.compareSync(password, passwordHash);
    return passwordMatch;
  }

}