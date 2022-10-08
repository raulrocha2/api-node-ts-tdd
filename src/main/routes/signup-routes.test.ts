import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'test_name',
        email: 'test_email@mail.com',
        password: 'passwd123',
        passwordConfirmation: 'passwd123'
      })
      .expect(200)
  })
})
