export namespace ISigninUseCase {

  export type DTO = {
    email: string
    password: string
  }

  export type View = {
    user: {
      email: string
      name: string
    },
    credentials: {
      accessToken: string
    }
  }

  export interface Method {
    execute (dto: DTO): Promise<View>
  }
}