import { ISurveyAnswerModel } from '../models/i-surveys'

export interface IAddSurveyModel {
  question: string
  answers: ISurveyAnswerModel[]
  date: Date
}

export interface IAddSurvey {
  add: (surveyData: IAddSurveyModel) => Promise<void>
}
