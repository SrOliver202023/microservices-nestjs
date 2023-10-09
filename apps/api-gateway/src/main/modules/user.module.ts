import { Module } from "@nestjs/common";
import { UserProfileController } from "../controllers";

@Module({
  controllers: [UserProfileController]
})
export class UserModule {}