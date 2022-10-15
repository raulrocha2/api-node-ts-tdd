import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { IController } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-alidator-adapter'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignUpController = (): IController => {
  const salt = 10
  const emailValidatorAdaptre = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signupController = new SignUpController(emailValidatorAdaptre, dbAddAccount)
  return new LogControllerDecorator(signupController)
}
