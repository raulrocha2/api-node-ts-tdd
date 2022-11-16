import { ObjectId } from 'mongodb'
import { ILoadAccountByEmailRepository } from '../../../../data/protocols/db/i-load-account-by-email-repository'
import { IUpdateAccessTokenRepository } from '../../../../data/protocols/db/i-update-access-token-repository'
import { IAccountModel } from '../../../../domain/models/i-account'
import { IAddAccount, IAddAccountModel } from '../../../../domain/usecases/i-add-account'
import { MongoHelper } from './helpers/mongo-helper'

export class AccountMongoRepository implements IAddAccount, ILoadAccountByEmailRepository, IUpdateAccessTokenRepository {
  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne(result.insertedId)
    return MongoHelper.map(account)
  }

  async loadByEmail (email: string): Promise<IAccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    })
    if (account) return MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { accessToken: token } }
    )
  }
}
