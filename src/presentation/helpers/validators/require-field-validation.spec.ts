import { MissingParamError } from '../../errors'
import { RequireFieldValidation } from './require-field-validation'

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validations fails', () => {
    const sut = new RequireFieldValidation('field-test')
    const error = sut.validate({ name: 'wrong-field' })
    expect(error).toEqual(new MissingParamError('field-test'))
  })
})
