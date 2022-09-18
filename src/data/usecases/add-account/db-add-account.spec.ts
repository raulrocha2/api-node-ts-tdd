import { IAddAccount } from '../../../domain/usecases/i-add-account'
import { DbAddAccount } from './db-add-account'
import { IEncrypter } from './protocols/encrypter'

interface ISutTypes {
  encripterStub: IEncrypter
  sut: IAddAccount
}

const makeEncrypterStub = (): IEncrypter => {
  class EncripterStub implements IEncrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncripterStub()
}

const makeSut = (): ISutTypes => {
  const encripterStub = makeEncrypterStub()
  const sut = new DbAddAccount(encripterStub)
  return {
    encripterStub,
    sut
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encripter with correct password', async () => {
    const { encripterStub, sut } = makeSut()
    const encryptSpy = jest.spyOn(encripterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Encripter throws', async () => {
    const { encripterStub, sut } = makeSut()
    jest.spyOn(encripterStub, 'encrypt').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
})
