import { IValidation } from '../../presentation/helpers/validators/i-validation'
import { RequireFieldValidation } from '../../presentation/helpers/validators/require-field-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'

export const makeSignupValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfimation']) {
    validations.push(new RequireFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
