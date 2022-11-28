import { EmailValidation, RequireFieldValidation, ValidationComposite } from '../../../../presentation/helpers/validators'
import { IValidation } from '../../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../adapters/validators/email-alidator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequireFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
