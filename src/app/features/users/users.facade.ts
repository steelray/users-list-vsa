import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IUser, IUserPort, USER_PORT, USER_ROLE, UserDTO } from '@libs/user';
import { ISelectItem } from '@shared/ui/form';
import { Observable } from 'rxjs';
// Use this facade to write all business logic related to users. No ui manupulation here.
@Injectable()
export class UsersFacade {
  private readonly usersApi = inject<IUserPort>(USER_PORT); 
  private readonly fb = inject(FormBuilder);

  readonly userEditForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    age: [0],
    role: [USER_ROLE.User]
  });

  get roleSelectItems(): ISelectItem[] {
    return Object.values(USER_ROLE).map(role => ({
      label: role.charAt(0).toUpperCase() + role.slice(1).toLowerCase(),
      value: role
    }));
  }
  
  getList(params?: UserDTO): Observable<IUser[]> {
    if(params?.role && this.roleSelectItems.findIndex(item => item.value === params?.role) === -1) {
      params.role = null;
    }
    return this.usersApi.list(params);
  }

  onEditUser(id: number, user: IUser): Observable<IUser> {
    if(this.usersApi?.editUser) {
      return this.usersApi.editUser(id, user);
    }
    throw new Error('Edit user method is not implemented in the current adapter');
  }

}