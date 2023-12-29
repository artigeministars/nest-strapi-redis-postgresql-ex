import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { Tables } from './table.entity';
import { TableSubscriber } from './table.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Tables])],
  providers: [ TablesService, TableSubscriber ],
  controllers: [TablesController],
  exports: [TypeOrmModule]
})
export class TablesModule {}