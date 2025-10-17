import { USER_ROLE } from '@libs/user';

export interface IUserItem {
  name: string;
  email: string;
  age: number;
  role: USER_ROLE;
  id: number;
}

// on user edit button click event
export type UserEditData = {
  id: number; // use index for mock adapter
  user: IUserItem;
}