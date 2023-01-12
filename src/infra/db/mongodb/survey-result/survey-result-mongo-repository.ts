import { ISurveyResultModel } from '@/domain/models/i-survey-result'
import { ISaveSurveyResult, ISaveSurveyResultModel } from '@/domain/usecases/i-save-survey-result'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyResultMongoRepository implements ISaveSurveyResult {
  async save (data: ISaveSurveyResultModel): Promise<ISurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('survey-results')
    const surveyResult = await surveyResultCollection.findOneAndUpdate({
      surveyId: data.surveyId,
      accountId: data.accountId
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true,
      returnDocument: 'after'
    })

    return surveyResult.value && MongoHelper.map(surveyResult.value)
  }
}