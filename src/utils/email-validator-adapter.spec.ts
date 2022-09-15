import { EmailValidatorAdapter } from './email-alidator-adapter'

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid-email')
    expect(isValid).toBe(false)
  })
})
