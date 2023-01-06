import { DbAddSurvey } from '@/data/usecases/add-survey/db-add-survey'
import { IAddSurvey } from '@/domain/usecases/i-add-survey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbAddSurvey = (): IAddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
