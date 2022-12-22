
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

const makeLoadSurveySub = (): ILoadSurveys => {
  class LoadSurveysStub implements ILoadSurveys {
    async load (): Promise<ISurveyModel[]> {
      return await new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }

  return new LoadSurveysStub()
}

interface ISutTypes {
  sut: LoadSurveysController
  loadSurveysStub: ILoadSurveys
}

const makeSut = (): ISutTypes => {
  const loadSurveysStub = makeLoadSurveySub()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
