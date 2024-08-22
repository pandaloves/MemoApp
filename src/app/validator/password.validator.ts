import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.value;
  if (!password) {
    return null;
  }

  const errors: any = {};

  if (password.length < 6) {
    errors.minlength = 'Password must be at least 6 characters long.';
  }

  if (!/[A-Z]/.test(password)) {
    errors.uppercase = 'Password must contain at least one uppercase letter.';
  }

  if (!/[a-z]/.test(password)) {
    errors.lowercase = 'Password must contain at least one lowercase letter.';
  }

  if (!/[0-9]/.test(password)) {
    errors.digit = 'Password must contain at least one digit.';
  }

  if (!/[\W_]/.test(password)) {
    errors.special =
      'Password must contain at least one non-alphanumeric character.';
  }

  return Object.keys(errors).length > 0 ? errors : null;
}
