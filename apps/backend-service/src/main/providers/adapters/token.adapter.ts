import { Provider } from "@nestjs/common";
import { TokenService } from "../../infra";

export const TokenAdapterProvider: Provider = {
  provide: 'TokenAdapter',
  useClass: TokenService
}