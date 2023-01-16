import {
  forbidden,
  ILoadSurveyById,
  IController,
  IHttpRequest,
  IHttpResponse,
  InvalidParamError,
  serverError,
  ISaveSurveyResult
} from './save-survey-result-protocols'

export class SaveSurveyResultController implements IController {
  constructor (
    private readonly saveSurveyResult: ISaveSurveyResult,
    private readonly loadSurveyById: ILoadSurveyById
  ) { }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const {
        accountId,
        answer,
        date
      } = httpRequest.body

      const survey = await this.loadSurveyById.loadById(surveyId)
      if (survey) {
        const answers = survey.answers.map(a => a.answer)
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }

      await this.saveSurveyResult.save({
        surveyId,
        accountId,
        answer,
        date
      })
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
