import { ok, serverError } from '../../../middlewares/auth-middleware-protocols'
import { IController, IHttpRequest, IHttpResponse, ILoadSurveys } from './load-surveys-protocols'

export class LoadSurveysController implements IController {
  constructor (
    private readonly loadSurveys: ILoadSurveys
  ) { }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return ok(surveys)
    } catch (error) {
      return serverError(error)
    }
  }
}
