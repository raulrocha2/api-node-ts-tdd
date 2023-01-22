import { mockSurveyModel, mockSurveyResultModel, mockSurveysModel } from '@/domain/test'
import { ILoadSurveyByIdRepository } from '../protocols/db/survey/i-load-survey-by-id-repository'
import { ISaveSurveyResultParams, ISaveSurveyResultRepository, ISurveyResultModel } from '../usecases/survey-result/save-survey-result/db-save-survey-result-protocol'
import { IAddSurveyParams, IAddSurveyRepository } from '../usecases/survey/add-survey/db-add-survey-protocols'
import { ILoadSurveysRepository, ISurveyModel } from '../usecases/survey/load-surveys/db-load-surveys-protocols'

export const mockAddSurveyRepository = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    async add (surveyData: IAddSurveyParams): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepositorySub = (): ILoadSurveyByIdRepository => {
  class LoadSurveyRepositorySub implements ILoadSurveyByIdRepository {
    async loadById (id: string): Promise<ISurveyModel> {
      return await new Promise(resolve => resolve(mockSurveyModel()))
    }
  }

  return new LoadSurveyRepositorySub()
}

export const mockLoadSurveyRepositorySub = (): ILoadSurveysRepository => {
  class LoadSurveyRepositorySub implements ILoadSurveysRepository {
    async loadAll (): Promise<ISurveyModel[]> {
      return await new Promise(resolve => resolve(mockSurveysModel()))
    }
  }

  return new LoadSurveyRepositorySub()
}

export const mockSaveSurveyResultRepository = (): ISaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements ISaveSurveyResultRepository {
    async save (data: ISaveSurveyResultParams): Promise<ISurveyResultModel> {
      return await new Promise(resolve => resolve(mockSurveyResultModel()))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}
