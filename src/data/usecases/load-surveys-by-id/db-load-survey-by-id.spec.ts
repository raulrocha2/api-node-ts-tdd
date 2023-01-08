import MockDate from 'mockdate'
import { DbLoadSurveyById } from './db-load-survey-by-id'
import { ISurveyModel, ILoadSurveyByIdRepository } from './db-load-survey-by-id-protocols'

const makeFakeSurvey = (): ISurveyModel => ({
  id: 'uuid_01',
  question: 'question_01',
  answers: [{
    image: 'image_01',
    answer: 'answer_01'
  }],
  date: new Date()
})

const makeLoadSurveyRepositorySub = (): ILoadSurveyByIdRepository => {
  class LoadSurveyRepositorySub implements ILoadSurveyByIdRepository {
    async loadById (id: string): Promise<ISurveyModel> {
      return await new Promise(resolve => resolve(makeFakeSurvey()))
    }
  }

  return new LoadSurveyRepositorySub()
}

interface ISutTypes {
  sut: DbLoadSurveyById
  loadSurveyByIdRepository: ILoadSurveyByIdRepository
}

const makeSut = (): ISutTypes => {
  const loadSurveyByIdRepository = makeLoadSurveyRepositorySub()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepository)
  return {
    sut,
    loadSurveyByIdRepository
  }
}

describe('DbLoadSurveyById Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyByIdRepository with correct id', async () => {
    const { sut, loadSurveyByIdRepository } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepository, 'loadById')
    await sut.loadById('valid_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should return a survey on success', async () => {
    const { sut } = makeSut()
    const survey = await sut.loadById('valid_id')
    expect(survey).toEqual(makeFakeSurvey())
  })

  test('Should return null if LoadSurveyByIdRepository returns null', async () => {
    const { sut, loadSurveyByIdRepository } = makeSut()
    jest.spyOn(loadSurveyByIdRepository, 'loadById').mockReturnValueOnce(
      new Promise(resolve => resolve(null))
    )
    const survey = await sut.loadById('invalid_id')
    expect(survey).toBeNull()
  })
})
