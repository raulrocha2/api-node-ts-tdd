import { ISaveSurveyResultParams } from '@/domain/usecases/survey-result/i-save-survey-result'

export interface ISaveSurveyResultRepository {
  save: (data: ISaveSurveyResultParams) => Promise<void>
}
