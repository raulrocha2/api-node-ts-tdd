import { DbAddAccount } from './db-add-account'
import { IEncrypter } from './protocols/encrypter'

describe('DbAddAccount Usecase', () => {
  test('Should call Encripter with correct password', async () => {
    class EncripterStub implements IEncrypter {
      async encrypt (value: string): Promise<string> {
        return await new Promise(resolve => resolve('hashed_password'))
      }
    }
    const encripterStub = new EncripterStub()
    const sut = new DbAddAccount(encripterStub)
    const encryptSpy = jest.spyOn(encripterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
