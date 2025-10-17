import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, model, output, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISelectItem } from './select-item';

@Component({
  selector: 'app-select',
  imports: [
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Select,
      multi: true,
    },
  ],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Select implements ControlValueAccessor {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  readonly label = input<string>();
  readonly placeholder = input<string>();
  readonly autoFocus = input<false>();
  readonly options = input.required<ISelectItem[]>();
  readonly disabled = model<boolean>(false);

  readonly valueChange = output<any>();
  readonly value = model<any>('');

  filterValue: string | undefined = '';

  private propagateChange: (value: any) => void = () => {
    /**/
  };
  private propagateTouched: () => void = () => {
    /**/
  };

  writeValue(value: any): void {
    this.value.set(value);
    this.changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: any) => void): void {
    this.propagateChange = fn;
  }
 
  registerOnTouched(fn: () => void): void {
    this.propagateTouched = fn;
  }

  onChanged(): void {
    const value = this.value();
    this.propagateChange(this.value());
    this.valueChange.emit(this.value());
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onBlur(): void {
    this.propagateTouched();
  }
}
