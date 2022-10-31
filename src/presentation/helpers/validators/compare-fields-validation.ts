import { InvalidParamError } from '../../errors'
import { IValidation } from './i-validation'

export class CompareFieldsValidation implements IValidation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldNameCompare: string
  ) { }

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldNameCompare]) {
      return new InvalidParamError(this.fieldNameCompare)
    }
  }
}
