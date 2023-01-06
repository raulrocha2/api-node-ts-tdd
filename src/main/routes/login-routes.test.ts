import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let accountCollection: Collection
describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'test_name',
          email: 'test_email@mail.com',
          password: 'passwd123',
          passwordConfirmation: 'passwd123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('passwd123', 10)
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'test_email@mail.com',
        password
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'test_email@mail.com',
          password: 'passwd123'
        })
        .expect(200)
    })

    test('Should return 401 with invalid credentials', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'test_email@mail.com',
          password: 'passwd123'
        })
        .expect(401)
    })
  })
})
