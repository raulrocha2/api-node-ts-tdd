import { IEncrypter } from '../../data/protocols/encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements IEncrypter {
  constructor (
    private readonly salt: number
  ) { }

  async encrypt (value: string): Promise<string> {
    const valueEncrypt = await bcrypt.hash(value, this.salt)
    return valueEncrypt
  }
}
