import { Provider } from "@nestjs/common";
import { EncryptionService } from "../../infra";

export const EncryptionAdapterProvider: Provider = {
  provide: 'EncryptionAdapter',
  useClass: EncryptionService
}