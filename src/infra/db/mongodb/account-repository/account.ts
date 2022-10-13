import { IAccountModel } from '../../../../domain/models/i-account'
import { IAddAccount, IAddAccountModel } from '../../../../domain/usecases/i-add-account'
import { MongoHelper } from './helpers/mongo-helper'

export class AccountMongoRepository implements IAddAccount {
  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne(result.insertedId)
    return MongoHelper.map(account)
  }
}
