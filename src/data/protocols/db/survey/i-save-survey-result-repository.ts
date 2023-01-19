import { ISurveyResultModel } from '@/domain/models/i-survey-result'
import { ISaveSurveyResultParams } from '@/domain/usecases/survey-result/i-save-survey-result'

export interface ISaveSurveyResultRepository {
  save: (data: ISaveSurveyResultParams) => Promise<ISurveyResultModel>
}
