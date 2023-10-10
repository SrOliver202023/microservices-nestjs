import { Module } from "@nestjs/common";
import { UserProfileController } from "../controllers";
import { ProducerService, UserProfileService } from "../services";

@Module({
  controllers: [UserProfileController],
  providers: [UserProfileService, ProducerService]
})
export class UserModule {}