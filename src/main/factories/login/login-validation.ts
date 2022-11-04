import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import { IValidation } from '../../../presentation/helpers/validators/i-validation'
import { RequireFieldValidation } from '../../../presentation/helpers/validators/require-field-validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '../../../utils/email-alidator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequireFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
