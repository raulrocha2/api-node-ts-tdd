import MockDate from 'mockdate'
import { LoadSurveyResultController } from './load-survey-result-controller.'
import { forbidden, IHttpRequest, ILoadSurveyById, InvalidParamError } from './load-survey-result-protocols'
import { mockSurveyById } from '@/presentation/test/mock-load-survey-by-id'

const mockRequest = (): IHttpRequest => ({
  params: {
    surveyId: 'any_id'
  },
  body: {
    answer: 'answer_01'
  }
})

interface ISutTypes {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: ILoadSurveyById
}

const makeSut = (): ISutTypes => {
  const loadSurveyByIdStub = mockSurveyById()
  const sut = new LoadSurveyResultController(loadSurveyByIdStub)
  return {
    sut,
    loadSurveyByIdStub
  }
}

describe('LoadSurveyResult controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 403 if LoadSurveyById return null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(
      new Promise((resolve) => resolve(null))
    )
    const httpReponse = await sut.handle(mockRequest())
    expect(httpReponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })
})
