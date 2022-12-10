import { IValidation } from '../../../../../presentation/protocols/i-validation'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { RequireFieldValidation, ValidationComposite } from '../../../../../validation/validators'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddSurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: IValidation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequireFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
