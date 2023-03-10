import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise(resolve => resolve('any_token'))
  },
  async verify (token: string): Promise<string> {
    return await new Promise(resolve => resolve('any_value'))
  }
}))

describe('Jwt Adapter', () => {
  describe('sign()', () => {
    test('Should call sign with correct values', async () => {
      const sut = new JwtAdapter('secret')
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })

    test('Should return a token on sign success', async () => {
      const sut = new JwtAdapter('secret')
      const token = await sut.encrypt('any_id')
      expect(token).toBe('any_token')
    })

    test('Should throw if sign throws', async () => {
      const sut = new JwtAdapter('secret')
      jest.spyOn(jwt, 'sign').mockImplementationOnce(
        () => { throw new Error() }
      )
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('verify()', () => {
    test('Should call verify with correct values', async () => {
      const sut = new JwtAdapter('secret')
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
    })

    test('Should return a value on verify success', async () => {
      const sut = new JwtAdapter('secret')
      const value = await sut.decrypt('any_token')
      expect(value).toBe('any_value')
    })

    test('Should throw if verify throws', async () => {
      const sut = new JwtAdapter('secret')
      jest.spyOn(jwt, 'verify').mockImplementationOnce(
        () => { throw new Error() }
      )
      const promise = sut.decrypt('any_token')
      await expect(promise).rejects.toThrow()
    })
  })
})
