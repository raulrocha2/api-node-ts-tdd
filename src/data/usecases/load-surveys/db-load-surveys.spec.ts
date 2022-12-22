import { ISurveyModel, ILoadSurveysRepository } from './db-load-surveys-protocols'
import { DbLoadSurveys } from './db-load-surveys'
import MockDate from 'mockdate'

const makeFakeSurveys = (): ISurveyModel[] => ([
  {
    id: 'uuid_01',
    question: 'question_01',
    answers: [{
      image: 'image_01',
      answer: 'answer_01'
    }],
    date: new Date()
  },
  {
    id: 'uuid_02',
    question: 'question_02',
    answers: [{
      image: 'image_01',
      answer: 'answer_01'
    }],
    date: new Date()
  },
  {
    id: 'uuid_03',
    question: 'question_03',
    answers: [{
      image: 'image_01',
      answer: 'answer_01'
    }],
    date: new Date()
  }
])

const makeLoadSurveyRepositorySub = (): ILoadSurveysRepository => {
  class LoadSurveyRepositorySub implements ILoadSurveysRepository {
    async loadAll (): Promise<ISurveyModel[]> {
      return await new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }

  return new LoadSurveyRepositorySub()
}

interface ISutTypes {
  sut: DbLoadSurveys
  loadSurveysRepository: ILoadSurveysRepository
}

const makeSut = (): ISutTypes => {
  const loadSurveysRepository = makeLoadSurveyRepositorySub()
  const sut = new DbLoadSurveys(loadSurveysRepository)
  return {
    sut,
    loadSurveysRepository
  }
}

describe('DbLoadSurveys Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepository } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepository, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(makeFakeSurveys())
  })

  test('Should throw if DbLoadSurveys throws', async () => {
    const { sut, loadSurveysRepository } = makeSut()
    jest.spyOn(loadSurveysRepository, 'loadAll').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
