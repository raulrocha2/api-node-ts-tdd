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
  question: 'question_01',
  answers: [{
    answer: 'answer_01',
    count: 0,
    percent: 0
  },
  {
    image: 'image_01',
    answer: 'other_answer',
    count: 0,
    percent: 0
  }],
  date: new Date()
})
