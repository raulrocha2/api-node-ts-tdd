export class EmailExistsError extends Error {
  constructor () {
    super('Email was already in use!')
    this.name = 'EmailExistsError'
  }
}
