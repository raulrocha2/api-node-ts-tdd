import { ISurveyResultModel } from '@/domain/models/i-survey-result'
import { ISaveSurveyResultParams } from '@/domain/usecases/survey-result/i-save-survey-result'
import { ISaveSurveyResult, ISaveSurveyResultRepository, ILaodSurveyResultRepository } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: ISaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: ILaodSurveyResultRepository
  ) { }

  async save (data: ISaveSurveyResultParams): Promise<ISurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId)
    return surveyResult
  }
}
