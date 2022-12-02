import { MissingParamError } from '../../presentation/errors'
import { RequireFieldValidation } from './require-field-validation'

describe('RequireField Validation', () => {
  test('Should return a MissingParamError if validations fails', () => {
    const sut = new RequireFieldValidation('field-test')
    const error = sut.validate({ name: 'wrong-field' })
    expect(error).toEqual(new MissingParamError('field-test'))
  })

  test('Should not return if validations succeeds', () => {
    const sut = new RequireFieldValidation('field_test')
    const error = sut.validate({ field_test: 'valid_field' })
    expect(error).toBeFalsy()
  })
})
