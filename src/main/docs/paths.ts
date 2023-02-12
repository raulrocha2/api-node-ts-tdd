import { loginPath } from './paths/login-path'
import { signupPath } from './paths/signup-path'
import { surveyResultPath } from './paths/survey-result-path'
import { surveysPath } from './paths/surveys-path'

export default {
  '/login': loginPath,
  '/signup': signupPath,
  '/surveys': surveysPath,
  '/survey/{surveyId}/results': surveyResultPath
}
