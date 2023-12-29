import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TablePlayersService } from './table-players.service';
import { TablePlayersController } from './table-players.controller';
import { TablePlayer } from './table-player.entity';
import { TablePlayerSubscriber } from './table-player.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([TablePlayer])],
  providers: [ TablePlayersService, TablePlayerSubscriber ],
  controllers: [TablePlayersController],
  exports: [TypeOrmModule]
})
export class TablePlayersModule {}