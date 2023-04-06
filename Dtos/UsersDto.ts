export interface CreateUserDto {
  name: String;
  email: String;
  password: String;
  confirmPassword: String;
  phoneNumber: String;
  dateOfBirth: Date;
}

export interface UpdateUserDto {
    name: String;
    email: String;
    currentPassword: String;
    newPassword: String;
    confirmPassword: String;
    phoneNumber: String;
    balance: Number;
  }

export interface DeleteUserDto {
    deletedAt: Date;
    deleted:boolean;
}

export interface PictureUpdateUserDto {
    picture: String;
}
