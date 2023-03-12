import request from 'supertest'
import { Collection, ObjectId } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyResultCollection: Collection
let surveyCollection: Collection
let accountCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    surveyResultCollection = await MongoHelper.getCollection('survey-results')
    await surveyResultCollection.deleteMany({})
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const makeAccessToken = async (): Promise<string> => {
    const res = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      role: 'admin'
    })
    const account = await accountCollection.findOne(res.insertedId)
    const id = account?._id.toString()
    const accessToken = sign({ id }, env.jwtSecretKey)
    await accountCollection.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: {
        accessToken
      }
    })
    return accessToken
  }

  describe('PUT /survey/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/survey/invalid_survey_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })

    test('Should return 200 on save survey result with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      const res = await surveyCollection.insertOne({
        question: 'any_question_1',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer_1'
          },
          { answer: 'any_answer_2' }
        ],
        date: new Date()
      })

      const survey = await surveyCollection.findOne(res.insertedId)
      const id = survey?._id.toString()

      const response = await request(app)
        .put(`/api/survey/${id}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'any_answer_1'
        })

      expect(response.status).toEqual(200)
      expect(response.body.surveyId).toEqual(id)
    })
  })

  describe('GET /survey/:surveyId/results', () => {
    test('Should return 403 on load survey result without accessToken', async () => {
      await request(app)
        .get('/api/survey/invalid_survey_id/results')
        .expect(403)
    })
  })
})
