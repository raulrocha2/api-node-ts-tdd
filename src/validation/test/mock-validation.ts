import { IValidation } from '@/presentation/protocols'

export const mockValidation = (): IValidation => {
  class ValidationStubs implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStubs()
}
