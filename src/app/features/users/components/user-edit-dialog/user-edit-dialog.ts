import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { UsersFacade } from '@features/users/users.facade';
import { IUserItem, UserEditData } from '@shared/ui';
import { Input, ISelectItem, Select } from '@shared/ui/form';
import { ReactiveFormsModule } from "@angular/forms";
import { MatButton } from '@angular/material/button';
import { USER_ROLE } from '@libs/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-user-edit-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    Input,
    ReactiveFormsModule,
    MatButton,
    Select
],
  templateUrl: './user-edit-dialog.html',
  styleUrl: './user-edit-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsersFacade]
})
export class UserEditDialog implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<UserEditDialog>);
  readonly data = inject<UserEditData>(MAT_DIALOG_DATA);
  readonly facade = inject(UsersFacade);
  readonly editForm = this.facade.userEditForm;
  readonly roleSelectItems: ISelectItem[] = this.facade.roleSelectItems;
  private readonly destroyRef$ = inject(DestroyRef);

  ngOnInit(): void {
    this.editForm.patchValue(this.data.user);
  }

  onClose(dataChanged = false): void {
    this.dialogRef.close(dataChanged);
  }

  onSave(): void {
    if(this.editForm.invalid) {
      console.error('Form is invalid', this.editForm.errors);
      return;
    }
    const data = this.editForm.value as IUserItem;
    this.facade.onEditUser(this.data.id, data).pipe(
      takeUntilDestroyed(this.destroyRef$)
    ).subscribe({
      next: () => this.onClose(true),
      error: () => this.onClose(false)
    });
  }
}
