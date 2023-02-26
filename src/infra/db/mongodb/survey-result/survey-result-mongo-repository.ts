import { ISurveyResultModel } from '@/domain/models/i-survey-result'
import { ISaveSurveyResult, ISaveSurveyResultParams } from '@/domain/usecases/survey-result/i-save-survey-result'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { QueryBuilder } from '../helpers/query-builder'

export class SurveyResultMongoRepository implements ISaveSurveyResult {
  async save (data: ISaveSurveyResultParams): Promise<ISurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('survey-results')
    await surveyResultCollection.findOneAndUpdate({
      surveyId: new ObjectId(data.surveyId),
      accountId: new ObjectId(data.accountId)
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true
    })
    const surveyResult = await this.loadBySurveyId(data.surveyId)
    return surveyResult
  }

  private async loadBySurveyId (surveyId: string): Promise<ISurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('survey-results')
    // const query = surveyResultCollection.aggregate
    const query = new QueryBuilder()
      .match({ surveyId: new ObjectId(surveyId) })
      .group({
        _id: 0,
        data: {
          $push: '$$ROOT'
        },
        count: {
          $sum: 1
        }

      })
      .unwind({
        path: '$data'

      })
      .lookup({
        from: 'surveys',
        localField: 'data.surveyId',
        foreignField: '_id',
        as: 'survey'

      })
      .unwind({
        path: '$survey'

      })
      .group({
        _id: {
          surveyId: '$survey._id',
          question: '$survey.question',
          date: '$survey.date',
          total: '$count',
          answer: {
            $filter: {
              input: '$survey.answers',
              as: 'item',
              cond: {
                $eq: [
                  '$$item.answer', '$data.answer'
                ]
              }
            }
          }
        },
        count: {
          $sum: 1
        }

      })
      .unwind({
        path: '$_id.answer'

      })
      .addFields({
        '_id.answer.count': '$count',
        '_id.answer.percent': {
          $multiply: [
            {
              $divide: [
                '$count', '$_id.total'
              ]
            }, 100
          ]
        }

      })
      .group({
        _id: {
          surveyId: '$_id.surveyId',
          question: '$_id.question',
          date: '$_id.date'
        },
        answers: {
          $push: '$_id.answer'
        }

      })
      .project({
        _id: 0,
        surveyId: '$_id.surveyId',
        question: '$_id.question',
        date: '$_id.date',
        answers: '$answers'

      })
      .build()

    const surveyResult = await surveyResultCollection.aggregate(query).toArray()
    return surveyResult?.length
      ? {
          surveyId: surveyResult[0].surveyId.toString(),
          question: surveyResult[0].question,
          answers: surveyResult[0].answers,
          date: surveyResult[0].date
        }
      : null
  }
}
