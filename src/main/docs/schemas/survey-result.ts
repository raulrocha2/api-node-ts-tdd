export const surveyResultSchema = {
  type: 'object',
  properties: {
    surveyId: {
      type: 'string'
    },
    question: {
      type: 'string'
    },
    answers: {
      type: 'array',
      $ref: '#/schemas/surveyResultAnswer'
    },
    data: {
      type: 'string'
    }
  },
  required: ['surveyId', 'question', 'answers']
}
