import { ChangeDetectionStrategy, Component, input, output, TemplateRef } from '@angular/core';
import { IUserItem, UserEditData } from './user-item';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-users-list',
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersList {
  readonly userList = input<IUserItem[]>();
  readonly customListItemTemplate = input<TemplateRef<{
    $implicit: IUserItem;
    index: number;
  }>>();
  readonly trackByKey = input<keyof IUserItem>('email'); 
  readonly editUser = output<UserEditData>();

  onEditUser(user: IUserItem): void {
    this.editUser.emit({ id: user.id, user });
  }
}
