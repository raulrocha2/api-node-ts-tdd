import { IEmailValidator } from '../presentation/protocols'

export class EmailValidatorAdapter implements IEmailValidator {
  isValid (email: string): boolean {
    return false
  }
}
