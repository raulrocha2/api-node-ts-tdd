import { IAddSurveyModel, IAddSurveyRepository } from '@/data/usecases/add-survey/db-add-survey-protocols'
import { ILoadSurveysRepository, ISurveyModel } from '@/data/usecases/load-surveys/db-load-surveys-protocols'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements IAddSurveyRepository, ILoadSurveysRepository {
  async add (surveyData: IAddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<ISurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()
    if (surveys) return MongoHelper.mapObject(surveys)
  }
}
