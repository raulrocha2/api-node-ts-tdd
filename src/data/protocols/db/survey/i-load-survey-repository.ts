import { ISurveyModel } from '../../../usecases/load-surveys/db-load-surveys-protocols'

export interface ILoadSurveysRepository {
  loadAll: () => Promise<ISurveyModel[]>
}
