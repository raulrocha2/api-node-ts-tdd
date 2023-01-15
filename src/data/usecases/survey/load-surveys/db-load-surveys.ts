import { ILoadSurveys, ILoadSurveysRepository, ISurveyModel } from './db-load-surveys-protocols'

export class DbLoadSurveys implements ILoadSurveys {
  constructor (
    private readonly loadSurveysRepository: ILoadSurveysRepository
  ) { }

  async load (): Promise<ISurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll()
    return surveys
  }
}
