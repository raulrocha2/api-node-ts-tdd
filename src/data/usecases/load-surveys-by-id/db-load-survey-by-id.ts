import { ISurveyModel } from '@/domain/models/i-surveys'
import { ILoadSurveyById, ILoadSurveyByIdRepository } from './db-load-survey-by-id-protocols'

export class DbLoadSurveyById implements ILoadSurveyById {
  constructor (
    private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository
  ) { }

  async loadById (id: string): Promise<ISurveyModel> {
    return await this.loadSurveyByIdRepository.loadById(id)
  }
}
