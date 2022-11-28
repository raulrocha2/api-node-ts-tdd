import {
  IAddAccount,
  IHasher,
  IAddAccountModel,
  IAccountModel,
  IAddAccountRepository,
  ILoadAccountByEmailRepository
} from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

const fakeAccount = (): IAccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const fakeAccoutData = (): IAddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'

})
const makeLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<IAccountModel> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add (accountData: IAddAccountModel): Promise<IAccountModel> {
      return await new Promise(resolve => resolve(fakeAccount()))
    }
  }
  return new AddAccountRepositoryStub()
}

const makeHasher = (): IHasher => {
  class HasherStub implements IHasher {
    async hash (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new HasherStub()
}

interface ISutTypes {
  encripterStub: IHasher
  sut: IAddAccount
  addAccountRepositoryStub: IAddAccountRepository
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
}

const makeSut = (): ISutTypes => {
  const encripterStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAddAccount(
    encripterStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  )
  return {
    encripterStub,
    sut,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { encripterStub, sut } = makeSut()
    const encryptSpy = jest.spyOn(encripterStub, 'hash')
    await sut.add(fakeAccoutData())
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { encripterStub, sut } = makeSut()
    jest.spyOn(encripterStub, 'hash').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.add(fakeAccoutData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(fakeAccoutData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.add(fakeAccoutData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(fakeAccoutData())
    expect(account).toEqual(fakeAccount())
  })

  test('Should return null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(
      new Promise(resolve => resolve(fakeAccount()))
    )
    const account = await sut.add(fakeAccoutData())
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(fakeAccoutData())
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })
})
