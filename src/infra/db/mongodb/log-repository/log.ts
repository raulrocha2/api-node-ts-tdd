import { ILogErrorRepository } from '../../../../data/protocols/i-log-error-repository'
import { MongoHelper } from '../account-repository/helpers/mongo-helper'

export class LogMongoRepository implements ILogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
