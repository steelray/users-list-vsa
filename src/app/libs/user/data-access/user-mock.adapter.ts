import { Injectable, signal } from '@angular/core';
import { IUserPort } from '../contracts/user.port';
import { Observable, of } from 'rxjs';
import { IUser } from '../contracts/user.interface';
import { USER_ROLE } from '../contracts/user.role';
import { IUserItem } from '@shared/ui';
import { UserDTO } from './user.dto';
// Use this adapter for mocking user data in tests or development
const USERS_MOCK: IUser[] = [
  {
    name: 'John Smith',
    email: 'john.smith@example.com',
    age: 30,
    role: USER_ROLE.Admin,
    id: 1
  },
  {
    name: 'Jamila Smith',
    email: 'jamila.smith@example.com',
    age: 28,
    role: USER_ROLE.User,
    id: 2
  },
  {
    name: 'Jenya Smith',
    email: 'jenya.smith@example.com',
    age: 18,
    role: USER_ROLE.Guest,
    id: 3
  },
];
@Injectable()
export class UserMockAdapter implements IUserPort {
  private readonly users = signal<IUser[]>(USERS_MOCK); // for manupulating mock data internally
  list(params?: UserDTO): Observable<IUser[]> {
    return of(this.users().filter(user => {
      if (params?.role) {
        return user.role === params.role;
      }
      return true;
    }));
  }
  editUser(id: number, data: IUserItem): Observable<IUserItem> {
    this.users.update(users => {
      const updatedUsers = [...users];
      return updatedUsers.map(user => user.id === id ? { ...data } : user);
    });
    return of(data);
  }
}