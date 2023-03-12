import { ILaodSurveyResultRepository } from '@/data/protocols/db/survey/i-load-survey-result-repository'
import { ISurveyResultModel } from '@/domain/models/i-survey-result'
import { ILaodSurveyResult } from '@/domain/usecases/survey-result/i-load-survey-result'
import { ILoadSurveyByIdRepository } from '../save-survey-result/db-save-survey-result-protocols'

export class DbLoadSurveyResult implements ILaodSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: ILaodSurveyResultRepository,
    private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository
  ) { }

  async load (surveyId: string): Promise<ISurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId)
      return {
        surveyId: survey.id,
        question: survey.question,
        date: survey.date,
        answers: survey.answers.map(answer => Object.assign({}, answer, {
          percent: 0,
          count: 0
        }))
      }
    }
    return surveyResult
  }
}
