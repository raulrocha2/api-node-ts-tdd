import { IAuthenticationModel } from '../../../domain/usecases/i-authentication'
import { ILoadAccountByEmailRepository } from '../../protocols/db/i-load-account-by-email-repository'
import { IAccountModel } from '../add-account/db-add-account-protocols'
import { DbAutthentication } from './db-authentication'

const fakeAccount = (): IAccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

const fakeAuthentication = (): IAuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
const makeLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
    async load (email: string): Promise<IAccountModel> {
      return await new Promise(resolve => resolve(fakeAccount()))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

interface ISutTypes {
  sut: DbAutthentication
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
}
const makeSut = (): ISutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAutthentication(loadAccountByEmailRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(fakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
