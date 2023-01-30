import { DbSaveSurveyResult } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result'
import { ISaveSurveyResult } from '@/domain/usecases/survey-result/i-save-survey-result'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'

export const makeDbSaveSurveyResult = (): ISaveSurveyResult => {
  const surveyMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveyMongoRepository)
}