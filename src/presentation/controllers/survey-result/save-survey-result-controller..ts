import { forbidden, ILoadSurveyById, IController, IHttpRequest, IHttpResponse, InvalidParamError, serverError } from './save-survey-result-protocols'

export class SaveSurveyResultController implements IController {
  constructor (
    private readonly loadSurveyById: ILoadSurveyById
  ) { }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (survey) {
        const answers = survey.answers.map(a => a.answer)
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
