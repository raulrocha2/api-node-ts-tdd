import { SaveSurveyResultController } from './save-survey-result-controller.'
import { forbidden, IHttpRequest, ILoadSurveyById } from './save-survey-result-protocols'
import MockDate from 'mockdate'
import { ISurveyModel } from '../survey/load-surveys/load-surveys-protocols'
import { InvalidParamError } from '@/presentation/errors'

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
  },
  params: {
    surveyId: 'any_id'
  }
})

const makeFakeSurveyModel = (): ISurveyModel => ({
  id: 'uuid_01',
  question: 'question_01',
  answers: [{
    image: 'image_01',
    answer: 'answer_01'
  }],
  date: new Date()
})

const makeSurveyById = (): ILoadSurveyById => {
  class LoadSurveyByIdStub implements ILoadSurveyById {
    async loadById (id: string): Promise<ISurveyModel> {
      return await new Promise(resolve => resolve(makeFakeSurveyModel()))
    }
  }

  return new LoadSurveyByIdStub()
}

interface ISutTypes {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: ILoadSurveyById
}

const makeSut = (): ISutTypes => {
  const loadSurveyByIdStub = makeSurveyById()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub)
  return {
    sut,
    loadSurveyByIdStub
  }
}

describe('SaveSurveyResult controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 403 if LoadSurveyById return null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(
      new Promise((resolve) => resolve(null))
    )
    const httpReponse = await sut.handle(makeFakeRequest())
    expect(httpReponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })
})
