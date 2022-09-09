export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`Invalidparam: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
