import { Module, OnModuleInit } from '@nestjs/common';
import { GameGeneralGateway } from './game-general.gateway';
import { GameGeneralSocketService } from './game-general-socket.service';
import { Logger } from '@nestjs/common';

const logger = new Logger('GameGeneralGatewayModule');

@Module({
  providers: [GameGeneralGateway, GameGeneralSocketService],
})
export class GameGeneralGatewayModule implements OnModuleInit {

    onModuleInit(): void {
        logger.log('GameGeneralGatewayModule init...');
      }

}