// import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
// import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter'
// import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account'
// import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
// import { LoginController } from '../../../presentation/controllers/login/login'
// import { IController } from '../../../presentation/protocols'
// import { LogControllerDecorator } from '../../decorators/log'
// import { makeSignupValidation } from './signup-validation'

// export const makeLoginController = (): IController => {
//   const salt = 10
//   const bcryptAdapter = new BcryptAdapter(salt)
//   const accountMongoRepository = new AccountMongoRepository()
//   const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
//   const loginController = new LoginController(dbAddAccount, makeSignupValidation())
//   const logMongoRepository = new LogMongoRepository()
//   return new LogControllerDecorator(loginController, logMongoRepository)
// }
