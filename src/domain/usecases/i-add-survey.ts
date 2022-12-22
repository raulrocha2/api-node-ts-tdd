import { ISurveyAnswerModel } from '../models/I-surveys'

export interface IAddSurveyModel {
  question: string
  answers: ISurveyAnswerModel[]
  date: Date
}

export interface IAddSurvey {
  add: (surveyData: IAddSurveyModel) => Promise<void>
}
