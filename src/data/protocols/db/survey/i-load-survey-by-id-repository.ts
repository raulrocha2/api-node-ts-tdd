import { ISurveyModel } from '../../../usecases/survey/load-surveys/db-load-surveys-protocols'

export interface ILoadSurveyByIdRepository {
  loadById: (id: string) => Promise<ISurveyModel>
}
