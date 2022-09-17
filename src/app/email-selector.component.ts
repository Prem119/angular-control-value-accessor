import { AfterViewInit, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'email-selector',
  templateUrl: './email-selector.component.html',
  styleUrls: ['./email-selector.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailSelectorComponent),
      multi: true
    }
  ]
})
export class EmailSelectorComponent implements AfterViewInit, ControlValueAccessor {
    public domains = ["gmail.com", "microsoft.com", "yahoo.com"];
    public emailForm: FormGroup;
    private onChange: (email: string) => void;
    private onTouched: () => void;

    constructor () {
        this.emailForm = new FormGroup({
            emailPrefix: new FormControl(''),
            emailDomain: new FormControl('')
        });
    }

    public ngAfterViewInit(): void {
        this.emailForm.valueChanges.subscribe(
            (value: any) => {
                const emailPrefix = value['emailPrefix'];
                const emailDomain = value['emailDomain'];
                if (emailPrefix && emailDomain) {
                    this.onChange(`${emailPrefix}@${emailDomain}`);
                } else {
                    this.onChange('');
                }
            }
        );
    }
    
    // Takes the input value from parent control.
    // This is used when we want to set the value for the
    // controls in this component.
    writeValue(value: string): void {
        if(value) {
            const splitValues = value.split('@');
            const formValue = {
                emailPrefix: splitValues[0],
                emailDomain: splitValues.length > 1 ? splitValues[1] : ''
            };
            this.emailForm.setValue(formValue);
        } else {
            this.emailForm.reset();
        }
    }

    // Sets the control state as changed.
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    // Sets the control state as touched.
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
