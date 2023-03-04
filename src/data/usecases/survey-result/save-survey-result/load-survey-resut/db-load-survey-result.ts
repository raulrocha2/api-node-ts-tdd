import { ILaodSurveyResultRepository } from '@/data/protocols/db/survey/i-load-survey-result-repository'
import { ISurveyResultModel } from '@/domain/models/i-survey-result'
import { ILaodSurveyResult } from '@/domain/usecases/survey-result/i-load-survey-result'

export class DbLoadSurveyResult implements ILaodSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: ILaodSurveyResultRepository
  ) { }

  async load (surveyId: string): Promise<ISurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return surveyResult
  }
}
