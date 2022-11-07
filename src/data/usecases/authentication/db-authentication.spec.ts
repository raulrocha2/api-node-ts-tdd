import { ILoadAccountByEmailRepository } from '../../protocols/db/i-load-account-by-email-repository'
import { IAccountModel } from '../add-account/db-add-account-protocols'
import { DbAutthentication } from './db-authentication'

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
      async load (email: string): Promise<IAccountModel> {
        const account: IAccountModel = {
          id: 'any_id',
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password'
        }
        return await new Promise(resolve => resolve(account))
      }
    }
    const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
    const sut = new DbAutthentication(loadAccountByEmailRepositoryStub)
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
