import { MissingParamError } from '../../errors'
import { IValidation } from '../../protocols/i-validation'

export class RequireFieldValidation implements IValidation {
  constructor (
    private readonly fieldName: string
  ) { }

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
