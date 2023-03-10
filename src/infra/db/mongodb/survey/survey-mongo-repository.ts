import { ILoadSurveyByIdRepository, IAddSurveyRepository, ILoadSurveysRepository } from '@/data/protocols/db/survey'
import { IAddSurveyParams } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { ISurveyModel } from '@/data/usecases/survey/load-surveys/db-load-surveys-protocols'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements IAddSurveyRepository, ILoadSurveysRepository, ILoadSurveyByIdRepository {
  async add (surveyData: IAddSurveyParams): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<ISurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()
    if (surveys) return MongoHelper.mapObject(surveys)
  }

  async loadById (id: string): Promise<ISurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
    if (survey) return MongoHelper.map(survey)
  }
}
