import { IAccountModel } from '@/domain/models/i-account'
import { ISurveyModel } from '@/domain/models/i-surveys'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'

let surveyCollection: Collection
let surveyResultsCollection: Collection
let accountCollection: Collection

const makeSurvey = async (): Promise<ISurveyModel> => {
  const resSurvey = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      },
      {
        answer: 'other_answer'
      }
    ],
    date: new Date()
  })
  const surveyInserted = await surveyCollection.findOne(resSurvey.insertedId)
  if (surveyInserted) return MongoHelper.map(surveyInserted)
}

const makeAccount = async (): Promise<IAccountModel> => {
  const resAccount = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    accessToken: 'any_token',
    role: 'admin'
  })
  const accountInserted = await accountCollection.findOne(resAccount.insertedId)
  if (accountInserted) return MongoHelper.map(accountInserted)
}

describe('Survey Result Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultsCollection = await MongoHelper.getCollection('survey-results')
    await surveyResultsCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('save()', () => {
    test('Should save a new survey result on success', async () => {
      const surveyId = (await makeSurvey()).id
      const accountId = (await makeAccount()).id
      const sut = new SurveyResultMongoRepository()
      const surveyResult = await sut.save({
        surveyId,
        accountId,
        answer: 'any_answer',
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toBe('any_answer')
    })

    test('Should save update a survey result on success', async () => {
      const surveyId = (await makeSurvey()).id
      const accountId = (await makeAccount()).id
      const sut = new SurveyResultMongoRepository()
      await sut.save({
        surveyId,
        accountId,
        answer: 'any_answer',
        date: new Date()
      })

      const surveyResult = await sut.save({
        surveyId,
        accountId,
        answer: 'any_answer_updated',
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toBe('any_answer_updated')
    })
  })
})
