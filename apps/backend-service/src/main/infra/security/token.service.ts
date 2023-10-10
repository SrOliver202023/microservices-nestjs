import { ITokenAdapter } from "@backend-service/src/core";
import { Injectable } from "@nestjs/common";
import * as JWT from 'jsonwebtoken'

@Injectable()
export class TokenService implements ITokenAdapter {
  async sign (payload: object, options: { expiresIn?: number; subject?: any; secretKey?: string }): Promise<string> {
    return JWT.sign(payload, options.secretKey, {
      expiresIn: options.expiresIn ?? 60 * 5,
      subject: options.subject
    })
  }

  async decode (token: string): Promise<{ header: any, payload: any }> {
    return JWT.decode(token, { complete: true, json: true })
  }

  async validate (payload: string, secretKey: string): Promise<{ header: any, payload: any }> {
    return JWT.verify(payload, secretKey, { complete: true })
  }
}