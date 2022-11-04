import { InvalidParamError } from '../../errors'
import { IValidation } from './i-validation'
import { ValidationComposite } from './validation-composite'

const makeValidationStub = (): IValidation => {
  class ValidationStubs implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStubs()
}

interface ISutTypes {
  sut: ValidationComposite
  validationStubs: IValidation[]
}

const makeSut = (): ISutTypes => {
  const validationStubs = [makeValidationStub(), makeValidationStub()]
  const sut = new ValidationComposite(validationStubs)
  return {
    validationStubs,
    sut
  }
}

describe('ValidationComposite', () => {
  test('Should return an error if any validations fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new InvalidParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new InvalidParamError('field'))
  })

  test('Should return the first error if more then one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new InvalidParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
  })

  test('Should not return error if validations succeeds ', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate')
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
