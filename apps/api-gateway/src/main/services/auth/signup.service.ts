import { IEncryptionAdapter, ISignupUseCase, IUserRepository } from "@api-gateway/src/core";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class SignupService implements ISignupUseCase.Method {
  constructor (
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository.Methods,
    @Inject('EncryptionAdapter')
    private readonly encryptionService: IEncryptionAdapter,
    @Inject('EMAIL_SENDER')
    private readonly emailSenderClient: ClientProxy
  ) {}

  async onApplicationBootstrap () {
    await this.emailSenderClient.connect();
  }

  async execute (data: IUserRepository.Params.Create): Promise<ISignupUseCase.View> {
    const userAlreadyExists = await this.userRepository.findOne({ email: data.email })
    if (userAlreadyExists) {
      throw new BadRequestException('User with e-mail already exists')
    }

    const encryptedPassword = await this.encryptionService.encript(data.password)

    const userCreated = await this.userRepository.create({ ...data, password: encryptedPassword })

    const { userId, email, name } = userCreated

    this.emailSenderClient.emit('user_created', { userId, email, name })

    return {
      userId,
      email,
      name
    }
  }
}