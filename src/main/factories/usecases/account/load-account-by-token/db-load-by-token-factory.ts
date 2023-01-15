import { DbLoadAccountByToken } from '@/data/usecases/account/load-account-by-token/db-load-account-by-token'
import { ILoadAccountByToken } from '@/domain/usecases/account/i-load-account-by-token'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import env from '@/main/config/env'

export const makeDbLoadAccountByToken = (): ILoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecretKey)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(
    accountMongoRepository,
    jwtAdapter
  )
}
