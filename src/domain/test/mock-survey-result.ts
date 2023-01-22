import { ISurveyResultModel } from '../models/i-survey-result'
import { ISaveSurveyResultParams } from '../usecases/survey-result/i-save-survey-result'

export const mockaveSurveyResultParams = (): ISaveSurveyResultParams => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResultModel = (): ISurveyResultModel => Object.assign(
  {}, mockaveSurveyResultParams(), { id: 'any_id' }
)
