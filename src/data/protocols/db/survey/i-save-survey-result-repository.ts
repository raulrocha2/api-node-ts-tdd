import { ISurveyResultModel } from '@/domain/models/i-survey-result'
import { ISaveSurveyResultModel } from '@/domain/usecases/survey-result/i-save-survey-result'

export interface ISaveSurveyResultRepository {
  save: (data: ISaveSurveyResultModel) => Promise<ISurveyResultModel>
}
