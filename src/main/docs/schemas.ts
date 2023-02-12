import {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  surveyAnswerSchema,
  surveySchema,
  surveysSchema,
  signupParamsSchema,
  addSurveyParamsSchema,
  saveSurveyParamsSchema,
  surveyResultSchema
} from './schemas/'

export default {

  account: accountSchema,
  loginParams: loginParamsSchema,
  signupParams: signupParamsSchema,
  surveys: surveysSchema,
  survey: surveySchema,
  surveyAnswer: surveyAnswerSchema,
  addSurveyParams: addSurveyParamsSchema,
  saveSurveyParams: saveSurveyParamsSchema,
  surveyResult: surveyResultSchema,
  error: errorSchema

}
