import { DbAutthentication } from '../../../../../data/usecases/authentication/db-authentication'
import { IAuthentication } from '../../../../../domain/usecases/i-authentication'
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypter-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository'
import env from '../../../../config/env'

export const makeDbAuthentication = (): IAuthentication => {
  const salt = 10
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecretKey)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAutthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )
}
