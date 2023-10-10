import { IEncryptionAdapter, ISignupUseCase, IUserRepository } from "@backend-service/src/core";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class SignupService implements ISignupUseCase.Method {
  constructor (
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository.Methods,
    @Inject('EncryptionAdapter')
    private readonly encryptionService: IEncryptionAdapter,
  ) {}

  async execute (data: ISignupUseCase.DTO): Promise<ISignupUseCase.View> {
    const userAlreadyExists = await this.userRepository.findOne({ email: data.email })
    if (userAlreadyExists) {
      throw new BadRequestException('User with e-mail already exists')
    }

    const encryptedPassword = await this.encryptionService.encript(data.password)

    const userCreated = await this.userRepository.create({ ...data, password: encryptedPassword })

    const { userId, email, name } = userCreated

    return {
      userId,
      email,
      name
    }
  }
}