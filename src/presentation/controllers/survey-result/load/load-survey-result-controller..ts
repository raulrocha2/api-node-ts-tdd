import {
  ILoadSurveyById,
  IController,
  IHttpRequest,
  IHttpResponse,
  forbidden,
  InvalidParamError,
  serverError
} from './load-survey-result-protocols'

export class LoadSurveyResultController implements IController {
  constructor (
    private readonly loadSurveyById: ILoadSurveyById
  ) { }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
