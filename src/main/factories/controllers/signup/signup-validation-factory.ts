import {
  CompareFieldsValidation,
  EmailValidation,
  RequireFieldValidation,
  ValidationComposite
} from '../../../../presentation/helpers/validators'
import { IValidation } from '../../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../adapters/validators/email-alidator-adapter'

export const makeSignupValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfimation']) {
    validations.push(new RequireFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfimation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
