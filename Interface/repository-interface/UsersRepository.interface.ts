import { CreateUserDto, DeleteUserDto, UpdateUserDto } from "../../Dtos";


export interface IUsersRepository {
       findById(id: string): Promise<Document | null>;
       findByEmail(email: string): Promise<Document | null>; 
       create(createUserDto: CreateUserDto): Promise<Document>; 
       update(id: string, updateUserDto: UpdateUserDto): Promise<Document | null>;
       delete(id: string,deleteUserDto: DeleteUserDto): Promise<Document | null>; 
}