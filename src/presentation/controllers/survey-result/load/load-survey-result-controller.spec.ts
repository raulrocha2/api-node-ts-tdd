import MockDate from 'mockdate'
import { LoadSurveyResultController } from './load-survey-result-controller.'
import { ILaodSurveyResult, forbidden, IHttpRequest, ILoadSurveyById, InvalidParamError, ServerError } from './load-survey-result-protocols'
import { mockSurveyById } from '@/presentation/test/mock-load-survey-by-id'
import { makeLoadSurveyResultStub } from '@/presentation/test/mock-load-survey-result'

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
  laodSurveyResultStub: ILaodSurveyResult
}

const makeSut = (): ISutTypes => {
  const loadSurveyByIdStub = mockSurveyById()
  const laodSurveyResultStub = makeLoadSurveyResultStub()
  const sut = new LoadSurveyResultController(loadSurveyByIdStub, laodSurveyResultStub)
  return {
    sut,
    loadSurveyByIdStub,
    laodSurveyResultStub
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

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(async () => {
      return await new Promise((_resolve, reject) => reject(new Error()))
    }
    )
    const httpReponse = await sut.handle(mockRequest())
    expect(httpReponse.body).toEqual(new ServerError(httpReponse.body))
  })

  test('Should call LaodSurveyResult with correct value', async () => {
    const { sut, laodSurveyResultStub } = makeSut()
    const loadSpy = jest.spyOn(laodSurveyResultStub, 'load')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 500 if LaodSurveyResult throws', async () => {
    const { sut, laodSurveyResultStub } = makeSut()
    jest.spyOn(laodSurveyResultStub, 'load').mockImplementationOnce(async () => {
      return await new Promise((_resolve, reject) => reject(new Error()))
    }
    )
    const httpReponse = await sut.handle(mockRequest())
    expect(httpReponse.body).toEqual(new ServerError(httpReponse.body))
  })
})
