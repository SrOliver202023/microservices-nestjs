import { IUser, IUserRepository } from "@api-gateway/src/core";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../infra";

@Injectable()
export class UserRepository implements IUserRepository.Methods {
  constructor (
    private prisma: PrismaService
  ) {}
  async create (data: IUserRepository.Params.Create): Promise<IUser> {
    return await this.prisma.user.create({ data })
  }

  async findOne (where: IUserRepository.Params.FindOne): Promise<IUser> {
    return await this.prisma.user.findUnique({ where })
  }

  async update ({ data, where }: IUserRepository.Params.Update): Promise<IUser> {
    return await this.prisma.user.update({ data, where })
  }

  async delete (where: IUserRepository.Params.FindOne): Promise<IUser> {
    return await this.prisma.user.delete({ where })
  }
}