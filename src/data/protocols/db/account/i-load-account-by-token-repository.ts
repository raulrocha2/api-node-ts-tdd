import { IAccountModel } from '@/domain/models/i-account'

export interface ILoadAccountByTokenRepository {
  loadByToken: (accessToken: string, role?: string) => Promise<IAccountModel>
}
