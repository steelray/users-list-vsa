import { Injectable } from '@angular/core';
import { IUserPort } from '../contracts/user.port';
import { Observable, of } from 'rxjs';
import { IUser } from '../contracts/user.interface';
import { UserDTO } from './user.dto';
// Use this adapter to connect to a real HTTP API in the future
@Injectable()
export class UserHttpAdapter implements IUserPort {
  // example method to fetch users
  list(params?: UserDTO): Observable<IUser[]> {
    return of([]); // Replace with actual HTTP call
  }

}