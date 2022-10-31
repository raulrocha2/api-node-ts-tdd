import { IValidation } from '../../presentation/helpers/validators/i-validation'
import { RequireFieldValidation } from '../../presentation/helpers/validators/require-field-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { makeSignupValidation } from './signup-validation'

jest.mock('../../presentation/helpers/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignupValidation()
    const validations: IValidation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfimation']) {
      validations.push(new RequireFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
