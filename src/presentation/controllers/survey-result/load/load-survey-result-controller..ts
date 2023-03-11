import {
  ILoadSurveyById,
  IController,
  IHttpRequest,
  IHttpResponse
} from './load-survey-result-protocols'

export class LoadSurveyResultController implements IController {
  constructor (
    private readonly loadSurveyById: ILoadSurveyById
  ) { }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { surveyId } = httpRequest.params
    await this.loadSurveyById.loadById(surveyId)
    return null
  }
}
