import { ISurveyModel } from '../models/I-surveys'

export interface ILoadSurveys {
  load: () => Promise<ISurveyModel[]>
}
