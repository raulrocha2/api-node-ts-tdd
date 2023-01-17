import { makeDbSaveSurveyResult } from '@/main/factories/usecases/survey-result/save-survey/db-save-survey-result-factory'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/survey/load-survey-by-id/db-load-surveys-factory'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result-controller.'
import { IController } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeSaveSurveyResultController = (): IController => {
  const surveyResultController = new SaveSurveyResultController(makeDbSaveSurveyResult(), makeDbLoadSurveyById())
  return makeLogControllerDecorator(surveyResultController)
}
