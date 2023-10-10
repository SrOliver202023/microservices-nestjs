export interface IUser {
  userId: string
  name: string
  email: string
  emailConfirmed: boolean
  password: string
  updatedAt: Date
  createdAt: Date
}