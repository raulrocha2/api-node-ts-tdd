
import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

describe('CompareFieldsValidation', () => {
  test('Should return a InvalidParamError if validations fails', () => {
    const sut = new CompareFieldsValidation('field', 'fieldToCompare')
    const error = sut.validate({ field: 'valid_field', fieldToCompare: 'wrong_field' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if validations succeeds', () => {
    const sut = new CompareFieldsValidation('field', 'fieldToCompare')
    const error = sut.validate({ field: 'field-test1', fieldToCompare: 'field-test1' })
    expect(error).toBeFalsy()
  })
})
