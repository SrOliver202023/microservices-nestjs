import { Module } from '@nestjs/common';
import { SigninService, SignupService } from "../services";
import { SigninController, SignupController } from "../controllers";
import { EncryptionAdapterProvider, TokenAdapterProvider, UserRepositoryProvider } from "../providers";

@Module({
  controllers: [
    SignupController,
    SigninController
  ],
  providers: [
    EncryptionAdapterProvider,
    UserRepositoryProvider,
    SignupService,
    SigninService,
  ],
})
export class AuthModule {}