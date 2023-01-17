/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeSaveSurveyResultController } from '../factories/controllers/survey-result/save-survey-result/save-survey-result-controller.factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const auth = adaptMiddleware(makeAuthMiddleware())
  router.put('/survey/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
}
