import {
  CompareFieldsValidation,
  EmailValidation,
  RequireFieldValidation,
  ValidationComposite
} from '../../../../../validation/validators'
import { IValidation } from '../../../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../../../infra/validators/email-alidator-adapter'

export const makeSignupValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequireFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
