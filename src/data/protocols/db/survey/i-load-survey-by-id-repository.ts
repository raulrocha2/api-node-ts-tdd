import { ISurveyModel } from '../../../usecases/load-surveys/db-load-surveys-protocols'

export interface ILoadSurveyByIdRepository {
  loadById: (id: string) => Promise<ISurveyModel>
}
