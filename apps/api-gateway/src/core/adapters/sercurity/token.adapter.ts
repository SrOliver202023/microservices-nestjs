
export interface ITokenAdapter {
  sign (payload: object, options: { expiresIn?: number, subject?: any, secretKey: string }): Promise<string>
  decode (token: string): Promise<{ header: any, payload: any }>
  validate (payload: string, secretKey: string): Promise<{ header: any, payload: any }>
}