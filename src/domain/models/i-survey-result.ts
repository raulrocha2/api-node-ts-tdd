export interface ISurveyResultModel {
  surveyId: string
  question: string
  answers: ISurveyResultAnswerModel[]
  date: Date
}

interface ISurveyResultAnswerModel {
  image?: string
  answer: string
  count: number
  percent: number
}
