import { CompareFieldsValidation, EmailValidation, RequireFieldValidation, ValidationComposite } from '../../../../presentation/helpers/validators'
import { IValidation } from '../../../../presentation/protocols/i-validation'
import { IEmailValidator } from '../../../../presentation/protocols'
import { makeSignupValidation } from './signup-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignupValidation()
    const validations: IValidation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfimation']) {
      validations.push(new RequireFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfimation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
