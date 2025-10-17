import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { UsersFacade } from './users.facade';
import { AsyncPipe } from '@angular/common';
import { UserEditData, UsersList } from '@shared/ui';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, filter, map, switchMap } from 'rxjs';
import { UserEditDialog } from './components/user-edit-dialog/user-edit-dialog';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ISelectItem, Select } from '@shared/ui/form';
import { USER_ROLE } from '@libs/user';


@Component({
  selector: 'app-users',
  imports: [
    AsyncPipe,
    UsersList,
    MatDialogModule,
    Select
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UsersFacade
  ]
})
export class Users {
  private readonly facade = inject(UsersFacade);
  private readonly _updateList$ = new BehaviorSubject<null>(null);
  readonly roleFilter = signal<string | null>(null);
  readonly _roleFilter$ = toObservable(computed(() => this.roleFilter()));
  private readonly destroyRef$ = inject(DestroyRef);
  
  private readonly dialog = inject(MatDialog);
  
  readonly roleSelectItems: ISelectItem[] = [
    { label: 'All', value: null },
    ...this.facade.roleSelectItems
  ];
  readonly users$ = combineLatest([
    this._updateList$,
    this._roleFilter$
  ]).pipe(
    map(([_, role]) => role as USER_ROLE),
    switchMap((role: USER_ROLE) => this.facade.getList({
      role
    }))
  );

  onEditUser(params: UserEditData): void {
    const data: UserEditData = params;
    this.dialog.open(UserEditDialog, {
      data,
    }).afterClosed().pipe(
      filter(dataChanged => !!dataChanged),
      takeUntilDestroyed(this.destroyRef$)
    ).subscribe(() => this._updateList$.next(null)); // update current list with changes
  }
}
