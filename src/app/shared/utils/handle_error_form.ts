import { FormGroup } from '@angular/forms';

export const handleErrorForm = (form: FormGroup): void => {
  Object.values(form.controls).forEach((control) => {
    if (control.invalid) {
      control.markAsTouched();
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    }
  });
};
