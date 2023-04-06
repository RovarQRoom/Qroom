import { Document } from "mongoose";
import { DeleteUserDto, UpdateUserDto, CreateUserDto } from '../../Dtos';

export interface IUsersService {
    getUserById(id: string): Promise<Document | null> ;
    UserLoggin(email: string, password: string): Promise<Document | null>;
    getUserByEmail(email: string): Promise<Document | null>;
    createUser(createUserDto: CreateUserDto): Promise<Document | null> ;
    updateUser(id: string, updateUserDto:UpdateUserDto): Promise<Document | null> ;
    deleteUser(id: string, deleteUserDto:DeleteUserDto): Promise<Document | null> ;
}