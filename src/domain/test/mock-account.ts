import { IAccountModel } from '../models/i-account'
import { IAddAccountParams } from '../usecases/account/i-add-account'
import { IAuthenticationParams } from '../usecases/account/i-authentication'

export const mockAddAccoutParams = (): IAddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'

})

export const mockAccountModel = (): IAccountModel => Object.assign({}, mockAddAccoutParams(), {
  id: 'any_id',
  password: 'hashed_password',
  accessToken: 'any_token'
})

export const mockAuthenticationParams = (): IAuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
