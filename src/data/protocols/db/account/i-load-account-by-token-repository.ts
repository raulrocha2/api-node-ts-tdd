import { IAccountModel } from '../../../usecases/add-account/db-add-account-protocols'

export interface ILoadAccountByTokenRepository {
  load: (accessToken: string, role?: string) => Promise<IAccountModel>
}
