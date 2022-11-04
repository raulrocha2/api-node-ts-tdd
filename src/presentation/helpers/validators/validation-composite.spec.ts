import { InvalidParamError } from '../../errors'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  test('Should return an error if any validations fails', () => {
    const sut = new ValidationComposite([])
    jest.spyOn(sut, 'validate').mockReturnValueOnce(new InvalidParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new InvalidParamError('field'))
  })
})
