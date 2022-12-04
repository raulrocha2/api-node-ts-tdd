import { IAddSurveyModel, IAddSurveyRepository } from '../../../../data/usecases/add-survey/db-add-survey-protocols'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements IAddSurveyRepository {
  async add (surveyData: IAddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }
}
