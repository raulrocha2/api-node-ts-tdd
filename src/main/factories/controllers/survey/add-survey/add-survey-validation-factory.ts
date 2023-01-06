import { IValidation } from '@/presentation/protocols'
import { RequireFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['question', 'answers']) {
    validations.push(new RequireFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
