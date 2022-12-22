import { ISurveyModel } from '../models/i-surveys'

export interface ILoadSurveys {
  load: () => Promise<ISurveyModel[]>
}
