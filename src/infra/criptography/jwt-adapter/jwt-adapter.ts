import jwt from 'jsonwebtoken'
import { IEncrypter } from '../../../data/protocols/criptography/i-encrypter'

export class JwtAdapter implements IEncrypter {
  constructor (
    private readonly secretValue: string
  ) { }

  async encrypt (value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secretValue)
  }
}
