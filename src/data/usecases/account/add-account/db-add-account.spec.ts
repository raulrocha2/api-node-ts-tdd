import {
  IAddAccount,
  IHasher,
  IAddAccountRepository,
  ILoadAccountByEmailRepository
} from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'
import { mockAccountModel, mockAddAccoutParams, throwError } from '@/domain/test'
import { mockAddAccountRepository, mockHasher, mockLoadAccountByEmailRepository } from '@/data/test'

interface ISutTypes {
  encripterStub: IHasher
  sut: IAddAccount
  addAccountRepositoryStub: IAddAccountRepository
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
}

const makeSut = (): ISutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValue(new Promise(resolve => resolve(null)))
  const encripterStub = mockHasher()
  const addAccountRepositoryStub = mockAddAccountRepository()
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
    await sut.add(mockAddAccoutParams())
    expect(encryptSpy).toHaveBeenCalledWith('any_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { encripterStub, sut } = makeSut()
    jest.spyOn(encripterStub, 'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccoutParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(mockAddAccoutParams())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccoutParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(mockAddAccoutParams())
    expect(account).toEqual(mockAccountModel())
  })

  test('Should return null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(
      new Promise(resolve => resolve(mockAccountModel()))
    )

    const account = await sut.add(mockAddAccoutParams())
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockAddAccoutParams())
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
