import { IHttpRequest, IValidation, IAddSurvey, IAddSurveyModel } from './add-survey-protocols'
import { AddSurveyController } from './add-survey-controller'
import { badRequest, serverError } from '../../../helpers/http/http-helper'
import { ServerError } from '../../../errors'

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }]
  }
})

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddSurvey = (): IAddSurvey => {
  class AddSurveyStub implements IAddSurvey {
    async add (surveyData: IAddSurveyModel): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddSurveyStub()
}

interface ISutTypes {
  sut: AddSurveyController
  validationStub: IValidation
  addSurveyStub: IAddSurvey
}

const makeSut = (): ISutTypes => {
  const validationStub = makeValidation()
  const addSurveyStub = makeAddSurvey()
  const sut = new AddSurveyController(validationStub, addSurveyStub)
  return {
    sut,
    validationStub,
    addSurveyStub
  }
}

describe('AddSurvey Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
      new Error()
    )
    const httpReponse = await sut.handle(makeFakeRequest())
    expect(httpReponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut()
    jest.spyOn(addSurveyStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((_resolve, reject) => reject(new Error()))
    }
    )
    const httpReponse = await sut.handle(makeFakeRequest())
    expect(httpReponse).toEqual(serverError(new ServerError(httpReponse.body)))
    expect(httpReponse.body).toEqual(new ServerError(httpReponse.body))
  })
})
