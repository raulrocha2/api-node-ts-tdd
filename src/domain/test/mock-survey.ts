import { ISurveyModel } from '../models/i-surveys'
import { IAddSurveyParams } from '../usecases/survey/i-add-survey'

export const mockSurveysModel = (): ISurveyModel[] => ([
  {
    id: 'uuid_01',
    question: 'question_01',
    answers: [{
      image: 'image_01',
      answer: 'answer_01'
    }],
    date: new Date()
  },
  {
    id: 'uuid_02',
    question: 'question_02',
    answers: [{
      image: 'image_01',
      answer: 'answer_01'
    }],
    date: new Date()
  },
  {
    id: 'uuid_03',
    question: 'question_03',
    answers: [{
      image: 'image_01',
      answer: 'answer_01'
    }],
    date: new Date()
  }
])

export const mockSurveyModel = (): ISurveyModel => ({
  id: 'any_survey_id',
  question: 'question_01',
  answers: [{
    answer: 'answer_01'
  }, {
    image: 'image_01',
    answer: 'other_answer'
  }],
  date: new Date()
})

export const mockAdSurveyParams = (): IAddSurveyParams => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})
