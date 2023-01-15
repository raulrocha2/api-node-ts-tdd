import { ISurveyModel } from '../../../usecases/survey/load-surveys/db-load-surveys-protocols'

export interface ILoadSurveysRepository {
  loadAll: () => Promise<ISurveyModel[]>
}
