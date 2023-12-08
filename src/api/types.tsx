export interface UserDto {
  id: string;
  username: string;
  email: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface SignupDto {
  email: string;
  username: string;
  password: string;
}
