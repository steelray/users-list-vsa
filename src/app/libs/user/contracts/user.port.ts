import { Observable } from 'rxjs';
import { IUser } from './user.interface';
import { IUserItem } from '@shared/ui';

export interface IUserPort {
  list(params?: unknown): Observable<IUser[]>;

  editUser?(id: number, data: IUserItem): Observable<IUserItem>;
}