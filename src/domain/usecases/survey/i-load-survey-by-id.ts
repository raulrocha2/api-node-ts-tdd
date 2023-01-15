import { ISurveyModel } from '../../models/i-surveys'

export interface ILoadSurveyById {
  loadById: (id: string) => Promise<ISurveyModel>
}
