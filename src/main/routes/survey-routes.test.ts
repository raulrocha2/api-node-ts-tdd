import request from 'supertest'
import { Collection, ObjectId } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection
describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
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

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Any question',
          answers: [{
            image: 'http://any_url_image_router.com',
            answer: 'any_answer 1'
          }, {
            answer: 'any_answer 2'
          }]
        })
        .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Any question',
          answers: [{
            image: 'http://any_url_image_router.com',
            answer: 'any_answer 1'
          }, {
            answer: 'any_answer 2'
          }]
        })
        .expect(204)
    })
  })
  describe('GET /surveys', () => {
    test('Should return 403 on load survey without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .send()
        .expect(403)
    })

    test('Should return 204 on load survey is empty', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return 200 on load all surveys with valid access token', async () => {
      const accessToken = await makeAccessToken()
      await surveyCollection.insertMany([
        {
          question: 'any_question-1',
          answers: [
            {
              image: 'any_image',
              answer: 'any_answer'
            }
          ],
          date: new Date()
        },
        {
          question: 'any_question-2',
          answers: [
            {
              image: 'any_image',
              answer: 'any_answer'
            }
          ],
          date: new Date()
        }
      ])

      const response = await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
      expect(response.status).toEqual(200)
      expect(response.body[0].question).toEqual('any_question-1')
    })
  })
})
