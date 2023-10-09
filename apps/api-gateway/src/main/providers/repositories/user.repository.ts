import { Provider } from "@nestjs/common";
import { UserRepository } from "../../repositories";

export const UserRepositoryProvider: Provider = {
  provide: 'UserRepository',
  useClass: UserRepository
}