import jwt from 'jsonwebtoken'
import { IDecrypter } from '../../../data/protocols/criptography/i-dencrypter'
import { IEncrypter } from '../../../data/protocols/criptography/i-encrypter'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor (
    private readonly secretValue: string
  ) { }

  async decrypt (token: string): Promise<string> {
    const value: any = await jwt.verify(token, this.secretValue)
    return value
  }

  async encrypt (value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secretValue)
  }
}
