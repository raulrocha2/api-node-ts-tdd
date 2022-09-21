import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<String> {
    return await new Promise(resolve => resolve('value_hash'))
  }
}))

interface ISutTypes {
  sut: BcryptAdapter
  salt: number
}

const makeSut = (): ISutTypes => {
  const salt = 12
  const sut = new BcryptAdapter(salt)
  return {
    sut,
    salt
  }
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const { sut, salt } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    const { sut } = makeSut()
    const valuehash = await sut.encrypt('any_value')
    expect(valuehash).toBe('value_hash')
  })
})
