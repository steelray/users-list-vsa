import { USER_ROLE } from './user.role';

export interface IUser {
  name: string;
  email: string;
  age: number;
  role: USER_ROLE;
  id: number;
}