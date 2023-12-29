import { Module } from '@nestjs/common';
import { UsersGateway } from './users.gateway';
import { GameUsersSocketService } from "./game-users-socket.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule.registerAsync({
                useFactory: () => ({
                  timeout: 5000,
                  maxRedirects: 5,
                }),
              }),],
  providers: [ UsersGateway, GameUsersSocketService ],
})
export class GameUsersGatewayModule {}