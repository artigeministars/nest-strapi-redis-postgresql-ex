import { Module } from '@nestjs/common';
import { GameUsersGatewayModule } from "./game-users-gateway/game-users-gateway.module";
import { GameTableGatewayModule } from "./game-table-gateway/game-table-gateway.module";
import { GameGeneralGatewayModule } from "./game-general-gateway/game-general-gateway.module";

@Module({
imports: [GameUsersGatewayModule, GameTableGatewayModule, GameGeneralGatewayModule],
exports: [GameUsersGatewayModule, GameTableGatewayModule, GameGeneralGatewayModule],
})
export class GatewaysModule {
}