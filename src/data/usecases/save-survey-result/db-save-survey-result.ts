import { ISurveyResultModel } from '@/domain/models/i-survey-result'
import { ISaveSurveyResultModel } from '@/domain/usecases/i-save-survey-result'
import { ISaveSurveyResult, ISaveSurveyResultRepository } from './db-save-survey-result-protocol'

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: ISaveSurveyResultRepository
  ) { }

  async save (data: ISaveSurveyResultModel): Promise<ISurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    return null
  }
}
