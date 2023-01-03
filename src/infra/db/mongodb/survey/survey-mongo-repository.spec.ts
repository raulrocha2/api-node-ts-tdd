import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'

let accountCollection: Collection
describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('surveys')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('add()', () => {
    test('Should add a survey on success', async () => {
      const sut = new SurveyMongoRepository()
      await sut.add({
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
      const survey = await accountCollection.findOne({
        question: 'any_question'
      })
      expect(survey).toBeTruthy()
      expect(survey?.question).toBe('any_question')
    })
  })

  describe('loadAll()', () => {
    test('Should laod all surveys on success', async () => {
      const sut = new SurveyMongoRepository()
      await accountCollection.insertMany([
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
      const surveys = await sut.loadAll()

      expect(surveys.length).toBe(2)
      expect(surveys[0].question).toBe('any_question-1')
      expect(surveys[1].question).toBe('any_question-2')
    })

    test('Should laod empty list', async () => {
      const sut = new SurveyMongoRepository()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })
})
