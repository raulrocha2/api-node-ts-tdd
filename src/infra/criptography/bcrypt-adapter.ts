import { IHasher } from '../../data/protocols/criptography/hasher'
import bcrypt from 'bcrypt'
import { IHashComparer } from '../../data/protocols/criptography/i-hash-comparer'

export class BcryptAdapter implements IHasher, IHashComparer {
  constructor (
    private readonly salt: number
  ) { }

  async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }

  async compare (value: string, valueHash: string): Promise<boolean> {
    return await bcrypt.compare(value, valueHash)
  }
}
