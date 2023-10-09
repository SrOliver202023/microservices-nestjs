import { IUser } from "../../domain"

export namespace IUserRepository {

  export namespace Params {
    export type Create = {
      email: string
      name: string
      password: string
    }

    export type Update = {
      data: Params.Create
      where: Params.FindOne
    }

    export type FindOne = {
      email: string
      userId?: never
    }
      |
    {
      email?: never
      userId: string
    };
  }

  export interface Methods {
    create (data: Params.Create): Promise<IUser>
    findOne (where: Params.FindOne): Promise<IUser>
    update ({ data, where }: Params.Update): Promise<IUser>
    delete (where: Params.FindOne): Promise<IUser>
  }
}