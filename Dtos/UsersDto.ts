export interface CreateUserDto {
  name: String;
  email: String;
  password: String;
  phoneNumber: String;
  dateOfBirth: Date;
}

export interface UpdateUserDto {
    name: String;
    email: String;
    password: String;
    phoneNumber: String;
    balance: Number;
  }

export interface DeleteUserDto {
    deletedAt: Date;
    deleted:boolean;
}
