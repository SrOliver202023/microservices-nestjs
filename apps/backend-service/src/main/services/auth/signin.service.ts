import { IEncryptionAdapter, ISigninUseCase, ITokenAdapter, IUserRepository } from "@backend-service/src/core";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";

@Injectable()
export class SigninService implements ISigninUseCase.Method {
  constructor (
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository.Methods,
    @Inject('EncryptionAdapter')
    private readonly encryptionService: IEncryptionAdapter,
    @Inject('TokenAdapter')
    private readonly serviceToken: ITokenAdapter,
  ) {}

  async execute (data: ISigninUseCase.DTO): Promise<ISigninUseCase.View> {
    const userFound = await this.userRepository.findOne({ email: data.email })

    const userAlreadyExists = !!userFound

    if (!userAlreadyExists) {
      throw new BadRequestException('Incorrect password or email')
    }

    const passwordIsCorrect = await this.encryptionService.compare(data.password, userFound.password)

    if (!passwordIsCorrect) {
      throw new BadRequestException('Incorrect password or email')
    }

    const { email, name, userId } = userFound

    const accessToken = await this.serviceToken.sign(
      { email, name },
      {
        secretKey: process.env.SECRET_KEY_ACCESS_TOKEN,
        subject: userId,
        expiresIn: Number(process.env.EXPIRES_IN_MINUTES_ACCESS_TOKEN ?? 60 * 60)
      })

    return {
      user: {
        email,
        name
      },
      credentials: {
        accessToken
      }
    }
  }
}