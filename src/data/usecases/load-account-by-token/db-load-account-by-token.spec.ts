import { IAccountModel, IDecrypter, ILoadAccountByTokenRepository } from './db-load-account-by-token-protocols'
import { DbLoadAccountByToken } from './db-load-account-by-token'

const makeFakeAccount = (): IAccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
  accessToken: 'valid_token'
})

const makeLoadAccountByToken = (): ILoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements ILoadAccountByTokenRepository {
    async load (accessToken: string, role?: string | undefined): Promise<IAccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

const makeDecrtyperStub = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

interface ISutTypes {
  loadAccountByTokenRepositoryStub: ILoadAccountByTokenRepository
  sut: DbLoadAccountByToken
  decrypterStub: IDecrypter
}

const makeSut = (): ISutTypes => {
  const loadAccountByTokenRepositoryStub = makeLoadAccountByToken()
  const decrypterStub = makeDecrtyperStub()
  const sut = new DbLoadAccountByToken(loadAccountByTokenRepositoryStub, decrypterStub)
  return {
    sut,
    loadAccountByTokenRepositoryStub,
    decrypterStub
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(
      new Promise(resolve => resolve(null))
    )
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })
})
