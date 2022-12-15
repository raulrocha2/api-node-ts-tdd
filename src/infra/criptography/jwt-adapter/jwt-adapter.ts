import jwt from 'jsonwebtoken'
import { IDecrypter } from '../../../data/protocols/criptography/i-dencrypter'
import { IEncrypter } from '../../../data/protocols/criptography/i-encrypter'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor (
    private readonly secretValue: string
  ) { }

  async decrypt (value: string): Promise<string> {
    await jwt.verify(value, this.secretValue)
    return await new Promise(resolve => resolve(null))
  }

  async encrypt (value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secretValue)
  }
}
