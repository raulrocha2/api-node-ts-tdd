import { IAccountModel } from '@/domain/models/i-account'

export interface ILoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<IAccountModel>
}
