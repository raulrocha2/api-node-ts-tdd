import { CompareFieldsValidation } from '../../../presentation/helpers/validators/compare-fields-validation'
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import { IValidation } from '../../../presentation/protocols/i-validation'
import { RequireFieldValidation } from '../../../presentation/helpers/validators/require-field-validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '../../../utils/email-alidator-adapter'

export const makeSignupValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfimation']) {
    validations.push(new RequireFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfimation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
