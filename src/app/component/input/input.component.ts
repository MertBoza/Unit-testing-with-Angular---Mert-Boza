import { Component, Input, forwardRef } from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() public control: FormControl = new FormControl();
  @Input() public type: 'search' | 'text' | 'number' = 'text';
  @Input() public placeholder: string = '';

  public onChange: any = () => {};
  public onTouch: any = () => {};

  constructor() { }

  writeValue(value: string): void {
    // Write value to the input element
    this.control.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onChangeHandler(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.onChange(value);
    this.onTouch();
  }
}
