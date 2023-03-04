import { ISurveyResultModel } from '@/domain/models/i-survey-result'

export interface ILaodSurveyResultRepository {
  loadBySurveyId: (surveyId: string) => Promise<ISurveyResultModel>
}
