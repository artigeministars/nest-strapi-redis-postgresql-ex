import { Module } from '@nestjs/common';
import { GameTableGateway } from './game-table.gateway';
import { GameTableMovesGateway } from './game-table-moves.gateway';
import { GameTableSocketService } from './game-table-socket.service';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule.registerAsync({
                useFactory: () => ({
                  timeout: 5000,
                  maxRedirects: 5,
                }),
              }),],
  providers: [GameTableGateway, GameTableMovesGateway, GameTableSocketService],
})
export class GameTableGatewayModule {}