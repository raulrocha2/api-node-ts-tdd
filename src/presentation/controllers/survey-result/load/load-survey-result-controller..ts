import {
  ILoadSurveyById,
  IController,
  IHttpRequest,
  IHttpResponse,
  forbidden,
  InvalidParamError,
  serverError,
  ILaodSurveyResult
} from './load-survey-result-protocols'

export class LoadSurveyResultController implements IController {
  constructor (
    private readonly loadSurveyById: ILoadSurveyById,
    private readonly laodSurveyResult: ILaodSurveyResult
  ) { }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      await this.laodSurveyResult.load(surveyId)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
