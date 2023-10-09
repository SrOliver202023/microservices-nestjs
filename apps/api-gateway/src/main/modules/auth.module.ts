import { Module } from '@nestjs/common';
import { SignupService } from "../services";
import { SignupController } from "../controllers";
import { EncryptionAdapterProvider, UserRepositoryProvider } from "../providers";

@Module({
  controllers: [SignupController],
  providers: [
    EncryptionAdapterProvider,
    UserRepositoryProvider,
    SignupService
  ],
})
export class AuthModule {}