
export interface IEncryptionAdapter {
  encript (value: string): Promise<string>
  compare (value: string, hash: string): Promise<boolean>
}