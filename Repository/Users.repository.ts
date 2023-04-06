import { Model, Document, ObjectId } from 'mongoose';
import { UserSignUp, IUser } from '../models';
import { CreateUserDto, UpdateUserDto, DeleteUserDto } from '../Dtos/Users.dto';
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
    if(!this.mongoDbExceptions.isAValidObjectId(id)){
      console.log('Invalid Id');
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
    if(!await this.comparePassword((createUserDto.confirmPassword).toString(),(createUserDto.password).toString())){
      console.log('Password And Confirm Password Not Matched');
      throw new Error('Password And Confirm Password Not Matched');
    }

    const user = new this.userModel(createUserDto);

    if (!user) throw new Error('User Cant Be Created');

    await user.save();

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Document | null> {

    const oldUser = await this.findById(id);
    if(!await this.comparePassword((updateUserDto.password).toString(),oldUser?.get('password'))){
      console.log('Password Not Matched');
      throw new Error('Password Not Matched');
    }

    if(updateUserDto.newPassword == null){
      console.log('New Password Cant Be Null');
      throw new Error('New Password Cant Be Null');
    }

    if(updateUserDto.newPassword == updateUserDto.password){
      console.log('New Password And Current Password Are The Same');
      throw new Error('New Password And Current Password Are The Same');
    }

    updateUserDto.newPassword = await this.hashPassword((updateUserDto.newPassword).toString());
    if(!await this.comparePassword((updateUserDto.confirmPassword).toString(),(updateUserDto.newPassword).toString())){
      console.log('New Password And Confirm Password Not Matched');
      throw new Error('New Password And Confirm Password Not Matched');
    }

    updateUserDto.password = updateUserDto.newPassword;

    if(!this.mongoDbExceptions.isAValidObjectId(id)){
      console.log('Invalid Id');
      throw new Error('Invalid Id');
    } 

    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    }).exec();

    if (!user){
      console.log('User was not found And Cant Be Updated');
      throw new Error('User was not found And Cant Be Updated');
    }

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