import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Valida se a data de nascimento implica que o motorista tem pelo menos 18 anos.
 * @param control AbstractControl
 * @returns ValidationErrors | null
 */
export function minAgeValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null; // Deixando o campo required cuidar disso
  }
  const birthDate = new Date(control.value);
  const today = new Date();
  const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

  return birthDate <= eighteenYearsAgo ? null : { minAge: true };
}

/**
 * Valida se a data é no futuro (exames e CNH devem ser válidos).
 * @param control AbstractControl
 * @returns ValidationErrors | null
 */
export function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null; // Deixando o campo required cuidar disso
  }
  const date = new Date(control.value);
  const today = new Date();
  // Zera as horas para comparar apenas a data (YYYY-MM-DD)
  today.setHours(0, 0, 0, 0);

  return date > today ? null : { futureDate: true };
}