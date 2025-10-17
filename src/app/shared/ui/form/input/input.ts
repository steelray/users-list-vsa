import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, model, output, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [
    FormsModule
  ],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Input,
      multi: true,
    }
  ]
})
export class Input implements ControlValueAccessor {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  readonly label = input<string>();
  readonly placeholder = input<string>();
  readonly type = input<'text' | 'number' | 'email'>('text');
  readonly disabled = model<boolean>(false);
  readonly autoFocus  = input<false>();

  readonly  valueChange = output<string | string[]>();
  readonly  keyUp = output<KeyboardEvent>();

  readonly value = signal<any>('');

  private propagateChange: (value: string) => void = () => {
    /**/
  };
  private propagateTouched: () => void = () => {
    /**/
  };

  writeValue(value: any): void {
    this.value.set(value);
    this.changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.propagateTouched = fn;
  }

  onKeyup(event: KeyboardEvent): void {
    this.value.set((event.target as HTMLInputElement).value);
    this.propagateChange((event.target as HTMLInputElement).value);
    this.valueChange.emit((event.target as HTMLInputElement).value);
    this.keyUp.emit(event);
  }

  onBlur(): void { 
    this.propagateTouched();
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

}
