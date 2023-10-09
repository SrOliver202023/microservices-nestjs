import { IUserRepository } from "../../repositories";

export namespace ISignupUseCase {
  export type DTO = IUserRepository.Params.Create

  export type View = {
    userId: string
    email: string
    name: string
  }

  export interface Method {
    execute (data: DTO): Promise<View>
  }
}
