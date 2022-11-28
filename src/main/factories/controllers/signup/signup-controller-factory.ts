import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { IController } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '../../usecases/db-add-account-factory'
import { makeDbAuthentication } from '../../usecases/db-authentication-factory'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignUpController = (): IController => {
  const signupController = new SignUpController(
    makeDbAddAccount(),
    makeSignupValidation(),
    makeDbAuthentication()
  )
  return makeLogControllerDecorator(signupController)
}
