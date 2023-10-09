import { IEncryptionAdapter } from "@api-gateway/src/core";
import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@Injectable()
export class EncryptionService implements IEncryptionAdapter {
  async encript (value: string): Promise<string> {
    const salt = await bcrypt.genSalt(Number(process.env.PASSWORD_ENCRYPTION_SALT ?? 9))
    return await bcrypt.hash(value, salt)
  }

  async compare (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}