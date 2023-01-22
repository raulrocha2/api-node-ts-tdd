import { mockAccountModel } from '@/domain/test'
import { IAccountModel, IAddAccount, IAddAccountParams } from '../controllers/login/signup/signup-controller-protocols'

export const mockAddAccount = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    async add (accountData: IAddAccountParams): Promise<IAccountModel> {
      return await new Promise(resolve => resolve(mockAccountModel()))
    }
  }
  return new AddAccountStub()
}
