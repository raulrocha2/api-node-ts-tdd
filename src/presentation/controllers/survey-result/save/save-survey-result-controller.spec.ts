import { SaveSurveyResultController } from './save-survey-result-controller.'
import { forbidden, IHttpRequest, ILoadSurveyById, ServerError, InvalidParamError, ISaveSurveyResult, ISurveyResultModel, ISaveSurveyResultParams, ok } from './save-survey-result-protocols'
import MockDate from 'mockdate'
import { mockSurveyResultModel } from '@/domain/test'
import { mockSurveyById } from '@/presentation/test/mock-load-survey-by-id'

const mockRequest = (): IHttpRequest => ({
  body: {
    answer: 'answer_01'
  },
  params: {
    surveyId: 'any_id'
  },
  accountId: 'any_account_id'
})

interface ISutTypes {
  sut: SaveSurveyResultController
  saveSurveyResultStub: ISaveSurveyResult
  loadSurveyByIdStub: ILoadSurveyById
}

const makeSaveSurveyResultStub = (): ISaveSurveyResult => {
  class SaveSurveyResultStub implements ISaveSurveyResult {
    async save (data: ISaveSurveyResultParams): Promise<ISurveyResultModel> {
      return await new Promise(resolve => resolve(mockSurveyResultModel()))
    }
  }

  return new SaveSurveyResultStub()
}

const makeSut = (): ISutTypes => {
  const saveSurveyResultStub = makeSaveSurveyResultStub()
  const loadSurveyByIdStub = mockSurveyById()
  const sut = new SaveSurveyResultController(saveSurveyResultStub, loadSurveyByIdStub)
  return {
    sut,
    saveSurveyResultStub,
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

  test('Should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut()
    const httpReponse = await sut.handle({
      body: {
        answer: 'wrong_answer'
      },
      params: {
        surveyId: 'any_id'
      }
    })
    expect(httpReponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('Should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
    await sut.handle(mockRequest())
    expect(saveSpy).toHaveBeenCalledWith({
      surveyId: 'any_id',
      accountId: 'any_account_id',
      answer: 'answer_01',
      date: new Date()
    })
  })

  test('Should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockImplementationOnce(async () => {
      return await new Promise((_resolve, reject) => reject(new Error()))
    }
    )
    const httpReponse = await sut.handle(mockRequest())
    expect(httpReponse.body).toEqual(new ServerError(httpReponse.body))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpReponse = await sut.handle(mockRequest())
    expect(httpReponse).toEqual(ok(mockSurveyResultModel()))
  })
})
