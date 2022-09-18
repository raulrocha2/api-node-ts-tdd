import {
  IAddAccount,
  IEncrypter,
  IAddAccountModel,
  IAccountModel,
  IAddAccountRepository
} from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

const fakeAccount = (): IAccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password'
})

const makeAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add (accountData: IAddAccountModel): Promise<IAccountModel> {
      return await new Promise(resolve => resolve(fakeAccount()))
    }
  }
  return new AddAccountRepositoryStub()
}

const makeEncrypterStub = (): IEncrypter => {
  class EncripterStub implements IEncrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncripterStub()
}

interface ISutTypes {
  encripterStub: IEncrypter
  sut: IAddAccount
  addAccountRepositoryStub: IAddAccountRepository
}

const makeSut = (): ISutTypes => {
  const encripterStub = makeEncrypterStub()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encripterStub, addAccountRepositoryStub)
  return {
    encripterStub,
    sut,
    addAccountRepositoryStub
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

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(
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

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const account = await sut.add(accountData)
    expect(account).toEqual(fakeAccount())
  })
})
