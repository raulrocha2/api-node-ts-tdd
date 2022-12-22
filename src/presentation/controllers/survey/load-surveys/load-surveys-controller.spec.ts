
// import { random, datatype, image } from '@faker-js/faker'
import { LoadSurveysController } from './load-surveys-controller'
import { ILoadSurveys, ISurveyModel } from './load-surveys-protocols'
import MockDate from 'mockdate'

const makeFakeSurveys = (): ISurveyModel[] => ([
  {
    id: 'datatype.uuid()',
    question: 'random.words()',
    answers: [{
      image: 'image.random()',
      answer: 'random.words()'
    }],
    date: new Date()
  },
  {
    id: 'datatype.uuid()',
    question: 'random.words()',
    answers: [{
      image: 'image.random()',
      answer: 'random.words()'
    }],
    date: new Date()
  },
  {
    id: 'datatype.uuid()',
    question: 'random.words()',
    answers: [{
      image: 'image.random()',
      answer: 'random.words()'
    }],
    date: new Date()
  }
])

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveys', async () => {
    class LoadSurveysStub implements ILoadSurveys {
      async load (): Promise<ISurveyModel[]> {
        return await new Promise(resolve => resolve(makeFakeSurveys()))
      }
    }
    const loadSurveysStub = new LoadSurveysStub()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    const sut = new LoadSurveysController(loadSurveysStub)
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
