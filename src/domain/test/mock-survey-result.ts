import { ISurveyResultModel } from '../models/i-survey-result'
import { ISaveSurveyResultParams } from '../usecases/survey-result/i-save-survey-result'

export const mockaveSurveyResultParams = (): ISaveSurveyResultParams => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResultModel = (): ISurveyResultModel => ({
  surveyId: 'any_survey_id',
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    count: 1,
    percent: 50
  },
  {
    image: 'any_image',
    answer: 'other_answer',
    count: 2,
    percent: 100
  }],
  date: new Date()
})
