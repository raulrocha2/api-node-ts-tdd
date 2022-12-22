import { ok } from '../../../middlewares/auth-middleware-protocols'
import { IController, IHttpRequest, IHttpResponse, ILoadSurveys } from './load-surveys-protocols'

export class LoadSurveysController implements IController {
  constructor (
    private readonly loadSurveys: ILoadSurveys
  ) { }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const surveys = await this.loadSurveys.load()
    return ok(surveys)
  }
}
