import { IAccountModel } from '@/domain/models/i-account'
import { ISurveyModel } from '@/domain/models/i-surveys'
import { Collection, ObjectId } from 'mongodb'
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
      },
      {
        answer: 'third_answer'
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
      const survey = (await makeSurvey())
      const accountId = (await makeAccount()).id
      const sut = new SurveyResultMongoRepository()
      await sut.save({
        surveyId: survey.id,
        accountId,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const surveyResult = await surveyResultsCollection.findOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId)
      })
      expect(surveyResult).toBeTruthy()
    })

    test('Should save update a survey result on success', async () => {
      const survey = (await makeSurvey())
      const accountId = (await makeAccount()).id

      await surveyCollection.insertOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId),
        answer: survey.answers[0].answer,
        date: new Date()
      })

      const sut = new SurveyResultMongoRepository()
      await sut.save({
        surveyId: survey.id,
        accountId,
        answer: survey.answers[1].answer,
        date: new Date()
      })

      const surveyResult = await surveyResultsCollection
        .find({
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(accountId)
        })
        .toArray()
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.length).toBe(1)
    })
  })

  describe('loadBySurveyId()', () => {
    test('Should load survey result on success', async () => {
      const survey = (await makeSurvey())
      const accountId = (await makeAccount()).id

      await surveyResultsCollection.insertMany([
        {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(accountId),
          answer: survey.answers[0].answer,
          date: new Date()
        },
        {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(accountId),
          answer: survey.answers[1].answer,
          date: new Date()
        },
        {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(accountId),
          answer: survey.answers[1].answer,
          date: new Date()
        }])
      const sut = new SurveyResultMongoRepository()

      const surveyResult = await sut.loadBySurveyId(survey.id, accountId)

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toBe(survey.id)
    })

    test('Should return null if there is no survey result', async () => {
      const survey = (await makeSurvey())
      const accountId = (await makeAccount()).id
      const sut = new SurveyResultMongoRepository()
      const surveyResult = await sut.loadBySurveyId(survey.id, accountId)

      expect(surveyResult).toBeNull()
    })
  })
})
